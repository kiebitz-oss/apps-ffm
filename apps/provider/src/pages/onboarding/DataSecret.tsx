import { SecretBox, SecretBoxProps, Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";

interface DataSecretProps extends SecretBoxProps {
  secret: string;
}

export const DataSecret: React.FC<DataSecretProps> = ({ secret }) => {
  return (
    <>
      <Text>
        <Trans id="common.data-secret.text">
          Bitte notieren Sie Ihren Datenschlüssel sorgfältig! Sie benötigen ihn,
          um sich auf einem anderen PC (Tablet, Smartphone etc.) einzuloggen
          oder auf einem anderen Endgerät auf Ihre Termine zugreifen zu können.
        </Trans>
      </Text>

      <div>
        <Title variant="book" as="h3">
          <Trans id="provider.secret.title">Ihr Sicherheitscode</Trans>
        </Title>
        <SecretBox secret={secret} copy />
      </div>
    </>
  );
};
