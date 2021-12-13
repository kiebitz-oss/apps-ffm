// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import { DataSecret } from 'apps/common/DataSecret';
import { BackupDataLink } from 'apps/provider/common/BackupDataLink';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link, Text, Title } from 'ui';
import { useOnboarding } from './OnboardingProvider';

export const SecretStep: React.FC = () => {
    const { state } = useOnboarding();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.data) {
            navigate('/provider/onboarding');
        }
    }, [state, navigate]);

    return (
        <main>
            <div className="md:w-2/3">
                <Title>Logindaten speichern</Title>

                <Text>
                    <Trans id="store-secrets.notice">
                        Um sich später wieder einzuloggen oder Ihre Termine
                        zugreifen zu können, benötigen Sie Ihre SICHERHEITSDATEI
                        und Ihren SICHERHEITSCODE. Bitte speichern Sie jetzt
                        Ihre SICHERHEITSDATEI und notieren Sie sich im Anschluss
                        den SICHERHEITSCODE.
                    </Trans>
                </Text>

                <BackupDataLink className="mb-12" />

                <DataSecret secret={'1234567890123456'} />

                <Link href="/provider/schedule" type="button">
                    <Trans id="wizard.leave">
                        Abschließen & zur Terminplanung
                    </Trans>
                </Link>
            </div>
        </main>
    );
};
