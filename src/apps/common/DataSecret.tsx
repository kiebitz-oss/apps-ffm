import { Trans } from '@lingui/macro';
import React from 'react';
import { Text } from 'ui';
import { SecretsBox } from './SecretBox';

interface DataSecretProps {
    secret: string;
    embedded?: boolean;
    hideNotice?: boolean;
}

export const DataSecret: React.FC<DataSecretProps> = ({ secret, embedded }) => {
    return (
        <>
            <Text>
                <Trans id="store-secrets.online.text">
                    Bitte notieren Sie Ihren Datenschlüssel sorgfältig! Sie
                    benötigen ihn, um sich auf einem anderen PC (Tablet,
                    Smartphone etc.) einzuloggen oder auf einem anderen Endgerät
                    auf Ihre Termine zugreifen zu können.
                </Trans>
            </Text>

            <SecretsBox secret={secret} copy />
        </>
    );
};
