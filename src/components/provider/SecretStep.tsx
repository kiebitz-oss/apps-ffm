// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from "@lingui/macro";
import { DataSecret } from "components/common/DataSecret";
import { BackupDataLink } from "components/provider/BackupDataLink";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Link, Text, Title } from "ui";
import { useOnboarding } from "./OnboardingProvider";

export const SecretStep: React.FC = () => {
  const { state } = useOnboarding();
  const router = useRouter();

  useEffect(() => {
    if (!state.data) {
      router.push("/provider/onboarding");
    }
  }, [state, router]);

  return (
    <main>
      <div className="md:w-2/3">
        <Title as="h1">Logindaten speichern</Title>

        <Text>
          <Trans id="provider.onboarding.secret.notice">
            Um sich später wieder einzuloggen oder Ihre Termine zugreifen zu
            können, benötigen Sie Ihre SICHERHEITSDATEI und Ihren
            SICHERHEITSCODE. Bitte speichern Sie jetzt Ihre SICHERHEITSDATEI und
            notieren Sie sich im Anschluss den SICHERHEITSCODE.
          </Trans>
        </Text>

        <BackupDataLink className="mb-12" />

        <DataSecret secret={"1234567890123456"} />

        <Link href="/provider/schedule" type="button" variant="primary">
          <Trans id="provider.onboarding.secret.button">
            Abschließen & zur Terminplanung
          </Trans>
        </Link>
      </div>
    </main>
  );
};
