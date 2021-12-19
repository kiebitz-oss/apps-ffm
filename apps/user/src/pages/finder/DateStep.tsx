import { Form, InputField, Text, Title } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import { BackLink } from "components/common/BackLink";
import { Link } from "components/Link";

export const DateStep: React.FC = () => {
  return (
    <main id="finder-date">
      <BackLink href="/finder">
        <Trans id="user.finder.date.back-link">zurück zum Terminauswahl</Trans>
      </BackLink>

      <Title variant="h1" as="h2">
        <Trans id="user.finder.date.title">Datum und Uhrzeit</Trans>
      </Title>

      <Text>
        <Trans id="user.finder.date.intro">
          Wann möchten Sie sich impfen lassen, Sie können Datum und Uhrzeit
          jederzeit im Prozess anpassen, wenn gewünscht. Bitte geben Sie ihren
          Wunschtermin unten an.
        </Trans>
      </Text>

      <Form className="flex flex-col gap-4">
        <InputField
          label={t({
            id: "user.finder.date.label",
            message: "Datum",
          })}
          type="date"
          name="date"
          className="mb-4 w-full"
        />

        <InputField
          label={t({
            id: "user.finder.time.label",
            message: "Zeit",
          })}
          type="time"
          name="time"
          className="mb-4 w-full"
        />

        <Link href="/finder/booking" type="button" variant="secondary">
          <Trans id="user.finder.date.submit">Termin auswählen</Trans>
        </Link>
      </Form>
    </main>
  );
};
