// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { Questionaire } from "./Questionair";

const UserStartPage: NextPage = () => {
  return (
    <main id="welcome">
      <Title variant="h1" as="h2" data-testid="view.title">
        <Trans id="user.welcome.title">Willkommen!</Trans>
      </Title>

      <Text>
        <Trans id="user.welcome.intro-1">
          Sie sind jetzt nur noch wenige Klicks von Ihrem Termin entfernt.
        </Trans>
      </Text>

      <Text className="mb-8">
        <Trans id="user.welcome.intro-2">
          Wir speichern generell keine persönlichen Daten, aber haben ein paar
          Fragen, damit Sie den richtigen Impfstoff erhalten.
        </Trans>
      </Text>

      <Questionaire />
    </main>
  );
};

export default UserStartPage;
