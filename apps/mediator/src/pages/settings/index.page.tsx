import { BackLink, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useMediatorApi } from "../MediatorApiContext";

const SettingsIndexPage: NextPage = () => {
  const api = useMediatorApi();

  return (
    <main>
      <BackLink href="/providers">Zurück zur Übersicht</BackLink>

      <Title>
        <Trans id="mediator.settings-index.title">Einstellungen</Trans>
      </Title>
    </main>
  );
};

export default SettingsIndexPage;
