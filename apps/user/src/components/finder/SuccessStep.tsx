import { Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { cancelBooking } from "actions/cancelBooking";
import { getAppointment } from "actions/getAppointment";
import { getBooking } from "actions/getBooking";
import { setBooking } from "actions/setBooking";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { PublicAppointment } from "../../../../../packages/vanellus/dist";
import { AppointmentCard } from "./AppointmentCard";

export const SuccessStep: React.FC = () => {
  const { i18n } = useLingui();
  const router = useRouter();
  const booking = getBooking();
  const [appointment, setAppointment] = useState<PublicAppointment>();

  useEffect(() => {
    if (booking) {
      getAppointment(booking.appointmentId, booking.providerId).then(
        setAppointment
      );
    }
  }, [booking]);

  // safeguard
  if (!booking) {
    router.push("/finder");

    return null;
  }

  const handleCancel: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!booking) {
      console.error("could not find booking");
      await router.push("/finder");

      return null;
    }

    await cancelBooking(booking).catch((error) => {
      console.error(error);
    });

    setBooking(undefined);

    await router.push("/finder");
  };

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
              <Trans id="user.finder.success.cancel-text">
                Sollte Sie Ihren Termin nicht wahrnehmen können, stornieren Sie
                ihn bitte mit nachstehendem Button.
              </Trans>
            </Text>

            <button
              onClick={handleCancel}
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
            <Trans id="user.finder.success.bring-along.title">
              Das müssen Sie zur Impfung gegen COVID-19 mitbringen:
            </Trans>
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <Trans id="user.finder.success.bring-along.papers">
                <strong>Ein amtliches Ausweisdokument</strong>
                <br />
                <i>(Personalausweis, Reisepass)</i>
              </Trans>
            </li>

            <li>
              <Trans id="user.finder.success.bring-along.vaccination-card">
                <strong>Impfpass</strong>
                <br />
                <i>
                  (wenn nicht vorhanden, erhalten Sie eine Ersatzbescheinigung.)
                </i>
              </Trans>
            </li>

            <li>
              <Trans id="user.finder.success.bring-along.mask">
                <strong>FFP2-Maske</strong>
                <br />
                <i>(zur Einhaltung der Hygienemaßnahmen)</i>
              </Trans>
            </li>
          </ul>
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            <Trans id="user.finder.success.preperation.title">
              Impfvorbereitungen
            </Trans>
          </Title>
          {/* 
          <ul className="grid grid-flow-row gap-4 pb-6">
            {vaccines[i18n.locale || "de"][
              appointment.vaccine as unknown as Vaccine
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

          <Text variant="text2">
            {
              vaccines[i18n.locale || "de"][
                appointment.vaccine as unknown as Vaccine
              ].pdfDescription
            }
          </Text> */}
        </section>

        <section className="mx-4 md:mx-0">
          <Title as="h3" variant="h2">
            <Trans id="user.finder.success.additional-preperation.title">
              Mit den folgenden Schritten können Sie sich zusätzlich auf Ihren
              Impftermin vorbereiten:
            </Trans>
          </Title>

          <ul className="flex flex-col gap-4">
            <li>
              <Text>
                <Trans id="user.finder.success.additional-preperation.part-1">
                  An- und Rückfahrt planen und organisieren
                </Trans>
              </Text>
            </li>

            <li>
              <Text>
                <Trans id="user.finder.success.additional-preperation.part-2">
                  Zeit für <strong>Nachbeobachtung</strong> einplanen.
                  <br />
                  <i>
                    (ca. 15 Minuten, bei bestimmten Vorerkrankungen
                    gegebenenfalls auch etwas länger)
                  </i>
                </Trans>
              </Text>
            </li>

            <li>
              <Text>
                <Trans id="user.finder.success.additional-preperation.part-3">
                  Gedanken zur eigenen <strong>Krankheitsgeschichte</strong>{" "}
                  <i>(zum Beispiel Allergien, Ohnmachtsanfälle)</i> machen, um
                  diese der Ärztin oder dem Arzt bei der Impfung mitteilen und
                  mögliche Risiken der Impfung abwägen zu können.
                </Trans>
              </Text>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
};
