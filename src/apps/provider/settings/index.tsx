import { Trans } from '@lingui/macro';
import React from 'react';
import { Title } from 'ui';

const SettingsPage: React.FC = () => {
    return (
        <main>
            <Title>
                <Trans id="provider.settings.title">Einstellungen</Trans>
            </Title>
        </main>
    );
};

export default SettingsPage;
