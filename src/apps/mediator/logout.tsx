import React from 'react';
import { useNavigate } from 'react-router';
import { Trans } from '@lingui/macro';
import { Button, Text, Title } from 'ui';
import { useMediatorApi } from 'hooks/useMediatorApi';

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
                    <Trans id="log-out-Box.title">Abmelden</Trans>
                </Title>

                <Text>
                    <Trans id="log-out-Box.text">
                        Möchtest Du Dich wirklich abmelden? Bitte stelle vorher
                        sicher, dass Du Deinen Sicherheitscode notiert hast. Nur
                        mit diesem Code kannst Du Dich später wieder anmelden.
                    </Trans>
                </Text>

                <Button onClick={logOut}>
                    <Trans id="log-out">Abmelden</Trans>
                </Button>
            </section>
        </main>
    );
};

export default LogoutPage;
