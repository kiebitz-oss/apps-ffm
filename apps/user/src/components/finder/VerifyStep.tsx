import { BackLink, Link, Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { bookAppointment } from "actions/bookAppointment";
import { AppointmentCard } from "components/finder/AppointmentCard";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { useFinder } from "./FinderProvider";

export const VerifyStep: React.FC = () => {
  const { appointment } = useFinder();
  const router = useRouter();

  // safeguard
  if (!appointment) {
    router.push("/finder");

    return null;
  }

  const handleBooking: MouseEventHandler<HTMLAnchorElement> = async (event) => {
    event.preventDefault();

    await bookAppointment(appointment);
    await router.push("/finder/success");
  };

  return (
    <main id="finder-verify">
      <BackLink href="/finder/appointment">
        <Trans id="user.finder.verify.back-link">
          zurück zum Terminauswahl
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2" className="ml-4 sm:ml-0">
        <Trans id="user.finder.verify.title">Übersicht</Trans>
      </Title>

      <Text variant="text2" className="mb-10 ml-4 sm:ml-0">
        <Trans id="user.finder.verify.intro">
          Hier ist Ihr gewählter Termin. Prüfen Sie bitte genau, ob alles
          stimmt.
          <br /> Anschließend können Sie den Termin endgültig buchen.
        </Trans>
      </Text>

      <div className="flex flex-col mb-10 w-full sm:flex-row sm:gap-12 sm:w-fit sm:max-w-[720px]">
        <div className="flex-1">
          <Title variant="book" as="h3">
            <Trans id="user.finder.verify.appointment.subtitle">
              Ihr Termin
            </Trans>
          </Title>

          <AppointmentCard appointment={appointment} border />
        </div>

        {appointment.provider.description && (
          <Text className="flex-1 mt-12 italic">
            <Trans id="user.finder.verify.appointment.description">
              {appointment.provider.description}
            </Trans>
          </Text>
        )}
      </div>

      <Link
        type="button"
        variant="primary"
        href="/finder/success"
        className="ml-4 sm:mt-0"
        onClick={handleBooking}
      >
        <Trans id="user.finder.verify.submit">Termin jetzt buchen</Trans>
      </Link>
    </main>
  );
};
