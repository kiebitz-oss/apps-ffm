import {
  Button,
  CopyToClipboardButton,
  SecretBox,
  Text,
  Title,
} from "@kiebitz-oss/ui";
import { t, Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { MouseEventHandler, useState } from "react";
import { BackupDataLink } from "./onboarding/BackupDataLink";
import { useProviderApi } from "./ProviderApiContext";

const LogOutPage: NextPage = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const api = useProviderApi();
  const secret = "s3cr3t"; // api.getSecret();
  // const navigate = useNavigate();

  const logOut: MouseEventHandler<HTMLButtonElement> = async () => {
    setLoggingOut(true);
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

      <div>
        <Title variant="book" as="h3">
          <Trans id="provider.secret.title">Ihr Sicherheitscode</Trans>
        </Title>
        {secret && <SecretBox secret={secret} />}
      </div>

      {secret && (
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
      )}

      <Button onClick={logOut} disabled={loggingOut}>
        <Trans id="provider.logout.button">Abmelden</Trans>
      </Button>
    </main>
  );
};

export default LogOutPage;
