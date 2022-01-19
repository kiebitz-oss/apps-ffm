import { BackLink, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";

const SettingsIndexPage: NextPage = () => {
  const { api } = useApp();

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
