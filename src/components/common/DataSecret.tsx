import { Trans } from "@lingui/macro";
import React from "react";
import { Text } from "ui";
import { SecretBox, SecretBoxProps } from "./SecretBox";

interface DataSecretProps extends SecretBoxProps {}

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

      <SecretBox secret={secret} copy />
    </>
  );
};
