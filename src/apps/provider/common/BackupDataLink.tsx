import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { str2ab } from 'helpers/conversion';
import { useServiceName } from 'hooks';
import { useProviderApi } from 'hooks/useProviderApi';
import React, { useEffect, useState } from 'react';
import { Message } from 'ui';

interface BackupDataLinkProps {
    className?: string;
    onSuccess?: () => void;
    downloadText?: string;
}

export const BackupDataLink: React.FC<BackupDataLinkProps> = ({
    className,
    onSuccess,
    downloadText,
}) => {
    const api = useProviderApi();
    const serviceName = useServiceName();
    const [blob, setBlob] = useState<Blob | null>(null);

    useEffect(() => {
        api.backupData().then(({ data }) => {
            setBlob(
                new Blob([str2ab(JSON.stringify(data))], {
                    type: 'application/octet-stream',
                })
            );
        });
    }, [api]);

    let providerName = 'Impfzentrum 3000';

    try {
        providerName = providerName
            .replaceAll(' ', '-')
            .replaceAll('.', '-')
            .toLowerCase();
    } catch (e) {
        // ignore?
    }

    const dateString = dayjs().format('YYYY-MM-DD-HH-mm');

    const filename =
        `${serviceName}-backup-${dateString}-${providerName}.enc`.toLowerCase();

    if (blob) {
        return (
            <a
                onClick={onSuccess}
                className={clsx('button success md', className)}
                download={filename}
                href={URL.createObjectURL(blob)}
            >
                {downloadText || (
                    <Trans id="provider.onboarding.download-backup-data">
                        Sicherungsdatei herunterladen
                    </Trans>
                )}
            </a>
        );
    }

    return (
        <Message waiting variant="warning">
            <Trans id="provider.onboarding.generating-backup-data">
                Bitte warten, erstelle Sicherungsdaten...
            </Trans>
        </Message>
    );
};
