import { Title, Vaccine, vaccines } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import clsx from "clsx";
import type { AggregatedPublicAppointment, PublicAppointment } from "vanellus";

export interface AppointmentCardProps {
  appointment: AggregatedPublicAppointment | PublicAppointment;
  className?: string;
  border?: true | undefined;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  children,
  appointment,
  className,
  border = false,
  ...props
}) => {
  const { i18n } = useLingui();

  return (
    <article
      className={clsx(
        "flex flex-col gap-4 items-center p-4 font-semibold default-focus",
        {
          ["rounded border-2 border-black"]: border,
        },
        className
      )}
      {...props}
    >
      <address className="flex flex-col items-center min-w-[15rem] font-medium text-center">
        <Title variant="h3" as="h3" className="pb-4">
          {appointment.provider.name}
        </Title>
        {appointment.provider.street},
        <br />
        {appointment.provider.zipCode} {appointment.provider.city}
      </address>

      <time className="flex flex-col font-semibold text-center">
        <div className="text-4xl">
          <Trans id="user.finder.appointment.card.time">
            {i18n.date(appointment.startDate.toDate(), { timeStyle: "short" })}{" "}
            Uhr
          </Trans>
        </div>

        <div className="text-xl">
          <Trans id="user.finder.appointment.card.date">
            am{" "}
            {i18n.date(appointment.startDate.toDate(), {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Trans>
        </div>
      </time>

      <p className="text-center">
        {
          vaccines[i18n.locale || "de"][
            appointment.properties.vaccine as Vaccine
          ].name
        }
      </p>

      {/* button */}
      {children}
    </article>
  );
};
