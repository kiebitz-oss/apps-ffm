import { Button, Link } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { setAppointment } from "stores/finder";
import type { AggregatedPublicAppointment } from "vanellus";
import { AppointmentCard } from "./AppointmentCard";

interface AppointmentCardProps {
  appointment: AggregatedPublicAppointment;
}

export const AppointmentCardSelector: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  const router = useRouter();

  // const onAppointmentSelect: MouseEventHandler<HTMLAnchorElement> =
  //   useCallback(async () => {
  //     setAppointment(appointment);
  //   }, []);

  return (
    <Link
      href="/finder/verify"
      className="group justify-center p-4 w-full text-center hover:text-black no-underline rounded shadow-appointment hover:shadow-appointment2 sm:mx-0"
      onClick={async (event) => {
        event.preventDefault();
        setAppointment(appointment);
        await router.push("/finder/verify");
      }}
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
