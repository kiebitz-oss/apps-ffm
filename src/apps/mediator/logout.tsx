import { Trans } from '@lingui/macro';
import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Text, Title } from 'ui';
import { useMediatorApi } from './common/MediatorApiContext';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();
    const api = useMediatorApi();

    const logOut = () => {
        api.logout().then(() => {
            navigate('/mediator/login');
        });
    };

    return (
        <main>
            <section>
                <Title>
                    <Trans id="mediator.logout.title">Abmelden</Trans>
                </Title>

                <Text>
                    <Trans id="mediator.logout.intro">
                        Möchtest Du Dich wirklich abmelden? Bitte stelle vorher
                        sicher, dass Du Deinen Sicherheitscode notiert hast. Nur
                        mit diesem Code kannst Du Dich später wieder anmelden.
                    </Trans>
                </Text>

                <Button onClick={logOut}>
                    <Trans id="mediator.logout.button">Abmelden</Trans>
                </Button>
            </section>
        </main>
    );
};

export default LogoutPage;
