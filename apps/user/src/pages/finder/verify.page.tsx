import { Link, PageHeader, Text, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { AppointmentCard } from "components/finder";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useCallback } from "react";
import { bookAppointment, useApp } from "stores/app";
import { useFinder } from "stores/finder";

const VerifyStep: NextPage = () => {
  const router = useRouter();
  const appointment = useFinder((state) => state.appointment);
  const booking = useApp((state) => state.booking);

  const handleBooking: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (event) => {
      event.preventDefault();

      if (appointment) {
        await bookAppointment(appointment);

        await router.push("/finder/success");
      }
    },
    [appointment, router]
  );

  if (booking) {
    router.push("/finder/success");

    return null;
  }

  // safeguard
  if (!appointment) {
    router.push("/finder");

    return null;
  }

  return (
    <main>
      <PageHeader
        title={t({
          id: "user.finder.verify.title",
          message: "Übersicht",
        })}
        backLink={{
          title: t({
            id: "user.finder.verify.back-link",
            message: "Zurück zur Terminauswahl",
          }),
          href: "/finder/appointment",
        }}
        intro={t({
          id: "user.finder.verify.intro",
          message:
            "Hier ist Ihr gewählter Termin. Prüfen Sie bitte genau, ob alles stimmt. Anschließend können Sie den Termin endgültig buchen.",
        })}
      />

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

      <div className="ml-4 sm:mt-0">
        <Link
          type="button"
          variant="primary"
          href="/finder/success"
          onClick={handleBooking}
        >
          <Trans id="user.finder.verify.submit">Termin jetzt buchen</Trans>
        </Link>
      </div>
    </main>
  );
};

export default VerifyStep;
