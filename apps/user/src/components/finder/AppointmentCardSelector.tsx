import { Button, Link } from "@impfen/common";
import { Trans } from "@lingui/macro";
import type { MouseEventHandler } from "react";
import type { AggregatedPublicAppointment } from "vanellus";
import { AppointmentCard } from "./AppointmentCard";
import { useFinder } from "./FinderProvider";

interface AppointmentCardProps {
  appointment: AggregatedPublicAppointment;
}

export const AppointmentCardSelector: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  const { setAppointment } = useFinder();

  const onAppointmentSelect: MouseEventHandler<HTMLAnchorElement> = () => {
    setAppointment(appointment);
  };

  return (
    <Link
      href="/finder/verify"
      className="group justify-center p-4 w-full text-center hover:text-black no-underline rounded shadow-appointment hover:shadow-appointment2 sm:mx-0"
      onClick={onAppointmentSelect}
      data-id={appointment.id}
    >
      <AppointmentCard appointment={appointment}>
        <Button
          tabIndex={-1}
          className="group-hover:text-white group-hover:bg-primary group-focus:bg-primary group-hover:border-transparent select-none shadow-lg"
        >
          <Trans id="user.finder.appointment.card.submit">
            Termin auswählen
          </Trans>
        </Button>
      </AppointmentCard>
    </Link>
  );
};
