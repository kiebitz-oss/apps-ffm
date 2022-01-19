// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Link, SecretBox, Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useProviderApi } from "components/ProviderApiContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BackupDataLink } from "./BackupDataLink";
import { useOnboardingState } from "./OnboardingStateProvider";

export const SecretStep: React.FC = () => {
  const { state } = useOnboardingState();
  const router = useRouter();
  const api = useProviderApi();

  useEffect(() => {
    if (!state.data) {
      router.push("/onboarding");
    }
  }, [state, router]);

  const [blob, setBlob] = useState<Blob | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    api.createBackup().then(({ keyPairs, secret }) => {
      setSecret(secret || "???");
      setBlob(
        new Blob([new TextEncoder().encode(JSON.stringify(keyPairs))], {
          type: "application/octet-stream",
        })
      );
    });
  }, [api]);

  return (
    <main>
      <div className="md:w-2/3">
        <Title as="h1">Logindaten speichern</Title>
        <div className="pb-8">
          <Text className="pb-4">
            <Trans id="provider.onboarding.secret.notice">
              Um sich später wieder einzuloggen oder Ihre Termine zugreifen zu
              können, benötigen Sie Ihre SICHERHEITSDATEI und Ihren
              SICHERHEITSCODE. Bitte speichern Sie jetzt Ihre SICHERHEITSDATEI
              und notieren Sie sich im Anschluss den SICHERHEITSCODE.
            </Trans>
          </Text>

          <BackupDataLink
            className="mb-12"
            providerName={state.data?.name || "???"}
            blob={blob}
          />
        </div>
        <div className="pb-12">
          <Text>
            <Trans id="common.data-secret.text">
              Bitte notieren Sie Ihren Datenschlüssel sorgfältig! Sie benötigen
              ihn, um sich auf einem anderen PC (Tablet, Smartphone etc.)
              einzuloggen oder auf einem anderen Endgerät auf Ihre Termine
              zugreifen zu können.
            </Trans>
          </Text>

          <Title variant="book" as="h3">
            <Trans id="provider.secret.title">Ihr Sicherheitscode</Trans>
          </Title>

          {secret && <SecretBox secret={secret} copy />}
        </div>

        <Link href="/schedule" type="button" variant="primary">
          <Trans id="provider.onboarding.secret.button">
            Abschließen & zur Terminplanung
          </Trans>
        </Link>
      </div>
    </main>
  );
};
