import type { Appointment } from "@kiebitz-oss/api";
import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import { useI18n } from "components/common/useI18n";
import { vaccines } from "config/vaccines";

export interface AppointmentCardProps {
  appointment: Appointment;
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
  const i18n = useI18n();

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 items-center p-4 font-semibold default-focus",
        {
          ["rounded-2xl border-2 border-black"]: border,
        },
        className
      )}
      {...props}
    >
      <address className="flex flex-col items-center font-medium">
        <Title variant="h3" as="h3">
          {appointment.provider.name}
        </Title>
        {appointment.provider.street},
        <br />
        {appointment.provider.zipCode} {appointment.provider.city}
      </address>

      <time className="flex flex-col font-semibold text-center">
        <div className="text-4xl">
          <Trans id="user.finder.appointment.card.time">
            {appointment.date.toLocaleTimeString(i18n.locale, {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </Trans>
        </div>

        <div className="text-xl">
          <Trans id="user.finder.appointment.card.date">
            am{" "}
            {appointment.date.toLocaleDateString(i18n.locale, {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </Trans>
        </div>
      </time>

      <p>{vaccines[i18n.locale || "de"][appointment.vaccine].name}</p>

      {/* button */}
      {children}
    </div>
  );
};
