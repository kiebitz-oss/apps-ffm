import {
  Button,
  CopyToClipboardButton,
  SecretBox,
  Text,
  Title,
} from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { backup } from "actions";
import { BackupDataLink } from "components";
import { useAppState } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { useEffect, useState } from "react";

const LogOutPage: NextPage = () => {
  const router = useRouter();
  const { logout } = useAppState();

  const logOut: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout();
    await router.push("/");
  };

  const [blob, setBlob] = useState<Blob | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    backup().then(({ keyPairs, secret }) => {
      setSecret(secret);
      setBlob(
        new Blob([new TextEncoder().encode(JSON.stringify(keyPairs))], {
          type: "application/octet-stream",
        })
      );
    });
  }, []);

  return (
    <main>
      <Title>
        <Trans id="provider.logout.title">Abmelden</Trans>
      </Title>

      <Text className="pb-8">
        <Trans id="provider.logout.intro">
          Möchten Sie sich wirklich abmelden? Bitte stellen Sie sicher, dass Sie
          Ihren Datenschlüssel notiert und Ihre Sicherungsdatei heruntergeladen
          haben . Nur damit können Sie sich erneut einloggen.
        </Trans>
      </Text>

      <div className="max-w-3xl">
        <div className="mb-2">
          <Title variant="book" as="h3">
            <Trans id="provider.logout.secret.title">Ihr Sicherheitscode</Trans>
          </Title>
          {secret && <SecretBox secret={secret} copy />}
        </div>

        {secret && (
          <div className="flex flex-row justify-between pb-8">
            <CopyToClipboardButton
              toCopy={secret}
              className="button sm secondary"
            >
              <Trans id="provider.logout.secret.copy">
                Datenschlüssel kopieren
              </Trans>
            </CopyToClipboardButton>

            <BackupDataLink
              blob={blob}
              providerName="~IMPFSTELLE 3000~"
              downloadText={t({
                id: "provider.logout.download-backup",
                message: "Sicherungsdatei herunterladen",
              })}
            />
          </div>
        )}
      </div>

      <Button onClick={logOut}>
        <Trans id="provider.logout.button">Abmelden</Trans>
      </Button>
    </main>
  );
};

export default LogOutPage;
