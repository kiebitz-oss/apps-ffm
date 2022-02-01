import { Page, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { Questionaire } from "components";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <Page>
      <PageHeader
        title={t({
          id: "user.welcome.title",
          message: "Willkommen!",
        })}
      />

      <Text variant="text1" className="mb-4 ml-4 sm:ml-0">
        <Trans id="user.welcome.intro-1">
          Sie sind jetzt nur noch wenige Klicks von Ihrem Termin entfernt.
        </Trans>
      </Text>

      <Text variant="text1" className="mb-8 ml-4 sm:ml-0">
        <Trans id="user.welcome.intro-2">
          Wir speichern generell keine persönlichen Daten, aber haben ein paar
          Fragen, damit Sie den richtigen Impfstoff erhalten.
        </Trans>
      </Text>

      <Questionaire />
    </Page>
  );
};

export default IndexPage;
