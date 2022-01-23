import { Link, PageHeader, SecretBox, Text, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { BackupDataLink } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { backup, useApp } from "stores/app";
import { useOnboarding } from "stores/onboarding";

const OnboardingBackupPage: NextPage = () => {
  const provider = useOnboarding((state) => state.provider);
  const secret = useApp((state) => state.secret);
  const keyPairs = useApp((state) => state.keyPairs);
  const router = useRouter();

  if (!provider) {
    router.push("/onboarding");
  }

  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    backup().then(() => {
      setBlob(
        new Blob([new TextEncoder().encode(JSON.stringify(keyPairs))], {
          type: "application/octet-stream",
        })
      );
    });
  }, [keyPairs]);

  return (
    <main>
      <div className="max-w-3xl">
        <PageHeader
          title={t({
            id: "provider.onboarding.secret.title",
            message: "Logindaten speichern",
          })}
        />

        <div className="pb-8">
          <Text className="pb-4">
            <Trans id="provider.onboarding.secret.intro">
              Um sich später wieder einzuloggen oder Ihre Termine zugreifen zu
              können, benötigen Sie Ihre SICHERHEITSDATEI und Ihren
              SICHERHEITSCODE. Bitte speichern Sie jetzt Ihre SICHERHEITSDATEI
              und notieren Sie sich im Anschluss den SICHERHEITSCODE.
            </Trans>
          </Text>

          <BackupDataLink
            className="mb-12"
            providerName={provider?.name || "???"}
            blob={blob}
          />
        </div>

        <div className="pb-12">
          <Text>
            <Trans id="provider.onboarding.secret.notice">
              Bitte notieren Sie Ihren Datenschlüssel sorgfältig! Sie benötigen
              ihn, um sich auf einem anderen PC (Tablet, Smartphone etc.)
              einzuloggen oder auf einem anderen Endgerät auf Ihre Termine
              zugreifen zu können.
            </Trans>
          </Text>

          <Title variant="book" as="h3">
            <Trans id="provider.onboarding.secret.your-code">
              Ihr Sicherheitscode
            </Trans>
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

export default OnboardingBackupPage;
