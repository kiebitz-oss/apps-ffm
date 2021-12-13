import { Trans } from '@lingui/macro';
import { useMediatorApi } from 'hooks/useMediatorApi';
import React, { useEffect, useState } from 'react';
import { Provider } from 'types';
import { Title } from 'ui';
import { ProviderTable } from '../common/ProvidersList';

export const ProvidersPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [providers, setProviders] = useState<Provider[]>([]);

    const api = useMediatorApi();

    useEffect(() => {
        api.getProviders().then((providers) => {
            setLoading(false);
            setProviders(providers);
        });
    }, [api]);

    return (
        <main>
            <Title>
                <Trans id="mediator.providers.title">Impfanbieter</Trans>
            </Title>

            <ProviderTable providers={providers} />
        </main>
    );
};
