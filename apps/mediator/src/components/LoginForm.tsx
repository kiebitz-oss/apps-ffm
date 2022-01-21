import { Message, Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useAppState } from "lib/AppProvider";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { useState } from "react";

export const LoginForm: React.FC = () => {
  const [invalidFile, setInvalidFile] = useState(false);
  const { authenticate } = useAppState();
  const router = useRouter();

  const uploadFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (error) => {
        if (error.target?.result && typeof error.target.result === "string") {
          const keyPairs = JSON.parse(error.target.result);

          if (
            keyPairs.signing === undefined ||
            keyPairs.encryption === undefined ||
            keyPairs.provider === undefined
          ) {
            setInvalidFile(true);
          } else {
            authenticate(keyPairs).then(() => router.push("/providers"));
          }
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <Title variant="h3">
        <Trans id="mediator.welcome.upload-key-pairs">
          Geheime Schlüssel laden
        </Trans>
      </Title>

      {invalidFile && (
        <Message variant="secondary">
          <Trans id="mediator.welcome.upload-key-pairs.invalid-file">
            Die von Ihnen gewählte Datei ist ungültig.
          </Trans>
        </Message>
      )}

      {!invalidFile && (
        <Text className="mb-8">
          <Trans id="mediator.welcome.upload-key-pairs.notice">
            Bitte laden Sie die Datei mit Ihren geheimen Vermittlerschlüsseln.
          </Trans>
        </Text>
      )}

      <form>
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer button primary md"
        >
          <Trans id="mediator.welcome.upload-key-pairs.input">
            Datei auswählen
          </Trans>

          <input
            id="file-upload"
            className="absolute inset-0 -z-10 w-auto opacity-0"
            type="file"
            onChange={uploadFile}
          />
        </label>
      </form>
    </div>
  );
};
