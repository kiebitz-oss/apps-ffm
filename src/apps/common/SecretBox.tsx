import { Trans } from '@lingui/macro';
import React from 'react';
import { CopyToClipboardButton, Title } from 'ui';

const renderSecret = (secret: string) => {
    const chunks = secret?.match(/.{1,4}/g) || [];
    const fragments: React.ReactNode[] = [];

    for (let i = 0; i < chunks.length; i++) {
        fragments.push(
            <React.Fragment key={`${i}-main`}>{chunks[i]}</React.Fragment>
        );

        if (i < chunks.length - 1)
            fragments.push(
                <strong
                    key={`${i}-dot`}
                    style={{ userSelect: 'none' }}
                    aria-hidden
                >
                    ·
                </strong>
            );
    }

    return <>{fragments}</>;
};

interface DataSecretProps {
    secret: string;
    copy?: boolean;
}

export const SecretsBox: React.FC<DataSecretProps> = ({
    secret,
    copy = false,
}) => {
    return (
        <div>
            <Title variant="book" as="h3">
                <Trans id="provider.secret.title">Ihr Sicherheitscode</Trans>
            </Title>

            <code className="flex justify-center items-center p-4 text-2xl font-bold text-white bg-black rounded-lg">
                {renderSecret(secret)}
                {copy && (
                    <CopyToClipboardButton toCopy={secret} className="text-sm">
                        &
                    </CopyToClipboardButton>
                )}
            </code>
        </div>
    );
};
