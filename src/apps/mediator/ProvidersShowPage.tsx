import { Trans } from '@lingui/macro';
import { BackLink } from 'apps/common/BackLink';
import { useMediatorApi } from 'hooks/useMediatorApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Provider } from 'types';
import { Button, Title } from 'ui';

export const ProviderShowPage: React.FC = () => {
    const [provider, setProvider] = useState<Provider>();
    const [verified] = useState<boolean>(true);
    const { id } = useParams();
    const api = useMediatorApi();

    useEffect(() => {
        if (id) {
            api.getProvider(id).then((provider) => {
                if (provider) {
                    setProvider(provider);
                }
            });
        }
    }, [api, id]);

    if (!provider) {
        return <main>Provider nicht gefunden</main>;
    }

    return (
        <main>
            <BackLink href="/mediator/providers">Zurück zur Übersicht</BackLink>

            <Title>
                <Trans id="mediator.providers.title">Provider Show</Trans>
            </Title>

            <table className="table striped">
                <thead>
                    <tr>
                        <th>
                            <Trans id="provider-field">Feld</Trans>
                        </th>
                        <th>
                            <Trans id="provider-value">Wert</Trans>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <Trans id="provider-name">Verifiziert?</Trans>
                        </th>
                        <td>{provider.verified ? 'ja' : 'nein'}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-name">Name</Trans>
                        </th>
                        <td>{provider.name}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-street">Straße</Trans>
                        </th>
                        <td>{provider.street}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-city">Stadt</Trans>
                        </th>
                        <td>{provider.city}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-zip-code">Postleitzahl</Trans>
                        </th>
                        <td>{provider.zipCode}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-email">E-Mail</Trans>
                        </th>
                        <td>{provider?.email}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-phone">Telefonnummer</Trans>
                        </th>
                        <td>{provider?.phone}</td>
                    </tr>
                    <tr>
                        <th>
                            <Trans id="provider-description">
                                Beschreibung
                            </Trans>
                        </th>
                        <td>{provider?.description}</td>
                    </tr>
                </tbody>
            </table>

            <div className="buttons-list">
                {!verified ? (
                    <Button variant="primary" size="sm">
                        Anbieter bestätigen
                    </Button>
                ) : (
                    <Button variant="secondary" size="sm">
                        Anbieter sperren
                    </Button>
                )}
            </div>
        </main>
    );
};
