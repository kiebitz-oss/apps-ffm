import { Button, CopyToClipboardButton, Text, Title } from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { MouseEventHandler, useState } from "react";
import { BackupDataLink } from "./onboarding/BackupDataLink";
import { SecretBox } from "./onboarding/SecretBox";

const LogOutPage: NextPage = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const secret = "1234567890123456";
  // const navigate = useNavigate();
  // const backend = useBackend();

  const logOut: MouseEventHandler<HTMLButtonElement> = async () => {
    setLoggingOut(true);

    // const kpa = keyPairsAction('logoutKeyPairs');

    // kpa.then((kp: any) => {
    //     const psa = providerSecretAction(undefined, 'logoutProviderSecret');

    //     psa.then((ps: any) => {
    //         // we give the backup data action a different name to avoid it being rejected
    //         // in case there's already a backup in progress... It will still be queued
    //         // up to ensure no conflicts can occur.
    //         const ba = backupDataAction(kp.data, ps.data, 'logout');

    //         ba.then(() => {
    //             backend.local.deleteAll('provider::');
    //             navigate('/provider?notice=thankyou');
    //         });

    //         ba.catch(() => setLoggingOut(false));
    //     });

    //     psa.catch(() => setLoggingOut(false));
    // });

    // kpa.catch(() => setLoggingOut(false));
  };

  return (
    <main>
      <Title>
        <Trans id="provider.logout.title">Abmelden</Trans>
      </Title>

      <Text>
        {loggingOut ? (
          <Trans id="provider.logout.notice.logging-out">
            Bitte warten, Sie werden abgemeldet...
          </Trans>
        ) : (
          <Trans id="provider.logout.intro">
            Möchten Sie sich wirklich abmelden? Bitte stellen Sie sicher, dass
            Sie Ihren Datenschlüssel notiert und Ihre Sicherungsdatei
            heruntergeladen haben . Nur damit können Sie sich erneut einloggen.
          </Trans>
        )}
      </Text>

      <SecretBox secret={secret} />

      <div className="flex flex-row justify-between">
        <CopyToClipboardButton toCopy={secret}>
          <Trans id="provider.logout.copy-secret">
            Datenschlüssel kopieren
          </Trans>
        </CopyToClipboardButton>

        <BackupDataLink
          downloadText={t({
            id: "provider.logout.download-backup",
            message: "Sicherungsdatei herunterladen",
          })}
        />
      </div>

      <Button onClick={logOut} disabled={loggingOut}>
        <Trans id="provider.logout.button">Abmelden</Trans>
      </Button>
    </main>
  );
};

export default LogOutPage;
