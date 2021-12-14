import { Trans } from '@lingui/macro';
import React, { useEffect, useState } from 'react';
import type { Provider } from 'types';
import { Title } from 'ui';
import { useMediatorApi } from '../common/MediatorApiContext';
import { ProviderTable } from '../common/ProvidersList';

export const ProvidersPage: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);

    const api = useMediatorApi();

    useEffect(() => {
        api.getProviders().then((providers) => {
            setProviders(providers);
        });
    }, [api]);

    return (
        <main>
            <Title>
                <Trans id="mediator.providers.title">Impfanbieter</Trans>
            </Title>

            {providers.length > 0 ? (
                <ProviderTable providers={providers} />
            ) : (
                <>Loading</>
            )}
        </main>
    );
};
