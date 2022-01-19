import { GeneratePdf16 } from "@carbon/icons-react";
import { Link, Text, Title, Vaccine, vaccines } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useApp } from "lib/AppProvider";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";
import { PublicAppointment, UnexpectedError } from "vanellus";
import { AppointmentCard } from "./AppointmentCard";
import { useFinder } from "./FinderProvider";

export const SuccessStep: React.FC = () => {
  const { api } = useApp();
  const { i18n } = useLingui();
  const {
    appointment: aggregatedAppointment,
    setAppointment: setAggegatedAppointment,
  } = useFinder();
  const { booking, setBooking } = useApp();
  const [appointment, setAppointment] = useState<PublicAppointment>();

  const router = useRouter();

  useEffect(() => {
    if (!aggregatedAppointment && !booking) {
      router.push("/finder");
    }
  }, [aggregatedAppointment, booking, router]);

  useEffect(() => {
    if (booking) {
      api
        .getAppointment(booking.appointmentId, booking.providerId)
        .then(setAppointment);
    }
  }, [api, booking]);

  useEffect(() => {
    if (!booking && aggregatedAppointment) {
      api
        .getAppointment(
          aggregatedAppointment.id,
          aggregatedAppointment.provider.id
        )
        .then(setAppointment);
    }
  }, [api, booking, aggregatedAppointment]);

  useEffect(() => {
    if (appointment && !booking) {
      api
        .bookAppointment(appointment)
        .then((booking) => {
          setBooking(booking);
        })
        .catch((error) => {
          if (error instanceof UnexpectedError) {
            console.log("DOUBLE BOOKING DETECTED");
          } else {
            throw error;
          }
        });
    }
  }, [api, setBooking, booking, appointment]);

  const onCancel: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!appointment) {
      console.error("could not find booking");
      await router.push("/finder");

      return null;
    } else {
      await api.cancelBooking(appointment).catch((error) => {
        console.error(error);
      });

      setAppointment(undefined);
      setAggegatedAppointment(undefined);
      setBooking(undefined);

      await router.push("/finder");
    }
  };

  // safeguard
  if (!appointment && !booking) {
    return null;
  }

  return (
    <main id="finder-success">
      <article className="flex flex-col gap-14">
        <section className="flex flex-col gap-8">
          <Title variant="h1" as="h2" className="mx-4 mb-4 md:mx-0">
            <Trans id="user.finder.success.title">
              Ihr Termin ist gebucht!
            </Trans>
          </Title>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col flex-1">
              <Title variant="book" as="h3">
                <Trans id="user.finder.success.appointment-title">
                  Ihr Termin
                </Trans>
              </Title>

              {appointment && (
                <AppointmentCard appointment={appointment} border />
              )}
            </div>

            <div className="flex flex-col flex-1">
              <Title variant="book" as="h3">
                <Trans id="user.finder.success.appointment-code">
                  Ihr Buchungscode
                </Trans>
              </Title>

              <div className="flex justify-center items-center p-4 text-2xl font-bold text-white bg-black rounded md:grow md:text-6xl">
                {!booking
                  ? "Buchung läuft..."
                  : booking.code.toUpperCase().slice(0, 4)}
              </div>
            </div>
          </div>

          <Text variant="text2" className="mx-4 md:mx-0">
            <Trans id="user.finder.success.intro">
              <strong>Wichtig:</strong> Bitte notieren Sie sich den
              untenstehenden Code und bringen ihn unbedingt zur Impfung mit.
            </Trans>
          </Text>

          <div className="flex flex-col gap-4 mx-4 md:mx-0">
            <Text variant="text2">
              Sollte Sie Ihren Termin nicht wahrnehmen können, stornieren Sie
              ihn bitte mit nachstehendem Button.
            </Text>

            <button
              onClick={onCancel}
              className="text-primary bg-primary/10 button md"
            >
              <Trans id="user.finder.success.cancel-button">
                Termin absagen
              </Trans>
            </button>
          </div>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Das müssen Sie zur Impfung gegen COVID-19 mitbringen:
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <strong>Ein amtliches Ausweisdokument</strong>
              <br />
              <i>(Personalausweis, Reisepass)</i>
            </li>

            <li>
              <strong>Impfpass</strong>
              <br />
              <i>
                (wenn nicht vorhanden, erhalten Sie eine Ersatzbescheinigung.)
              </i>
            </li>

            <li>
              <strong>FFP2-Maske</strong>
              <br />
              <i>(zur Einhaltung der Hygienemaßnahmen)</i>
            </li>
          </ul>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Impfvorbereitungen
          </Title>

          {appointment?.properties.vaccine && (
            <ul className="grid grid-flow-row gap-4 pb-6">
              {vaccines[i18n.locale || "de"][
                appointment?.properties.vaccine as unknown as Vaccine
              ].pdfs.map((pdf) => (
                <li key={pdf.label}>
                  <Link
                    href={pdf.url}
                    external
                    className="text-primary bg-primary/10 button md"
                  >
                    <GeneratePdf16 />
                    <span className="break-all">{pdf.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {appointment?.properties.vaccine && (
            <Text variant="text2">
              {
                vaccines[i18n.locale || "de"][
                  appointment?.properties.vaccine as unknown as Vaccine
                ].pdfDescription
              }
            </Text>
          )}
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            Mit den folgenden Schritten können Sie sich zusätzlich auf Ihren
            Impftermin vorbereiten:
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <Text>An- und Rückfahrt planen und organisieren</Text>
            </li>

            <li>
              <Text>
                Zeit für <strong>Nachbeobachtung</strong> einplanen.
                <br />
                <i>
                  (ca. 15 Minuten, bei bestimmten Vorerkrankungen gegebenenfalls
                  auch etwas länger)
                </i>
              </Text>
            </li>

            <li>
              <Text>
                Gedanken zur eigenen <strong>Krankheitsgeschichte</strong>{" "}
                <i>(zum Beispiel Allergien, Ohnmachtsanfälle)</i> machen, um
                diese der Ärztin oder dem Arzt bei der Impfung mitteilen und
                mögliche Risiken der Impfung abwägen zu können.
              </Text>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};
