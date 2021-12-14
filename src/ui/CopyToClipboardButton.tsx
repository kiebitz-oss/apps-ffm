import { Trans } from '@lingui/macro';
import React, { MouseEventHandler } from 'react';
import { useCopyToClipboard } from 'react-use';
import { ButtonProps } from 'ui';

interface CopyToClipboardButton extends ButtonProps {
    toCopy: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButton> = ({
    children,
    toCopy,
    ...props
}) => {
    const [state, copyToClipboard] = useCopyToClipboard();

    const onClick: MouseEventHandler<HTMLButtonElement> = () => {
        copyToClipboard(toCopy);
    };

    return (
        <button
            disabled={!!state.error || !!state.value}
            {...props}
            onClick={onClick}
        >
            {!!state.error ? (
                <Trans id="common.copy.failed">Fehlgeschlagen</Trans>
            ) : state.value ? (
                <Trans id="common.copy.succeeded">In der Zwischenablage</Trans>
            ) : (
                children || <Trans id="ui.copy">Kopieren</Trans>
            )}
        </button>
    );
};
