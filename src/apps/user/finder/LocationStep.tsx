import { t, Trans } from '@lingui/macro';
import { BackLink } from 'apps/common/BackLink';
import { ProviderCard } from 'apps/common/ProviderCard';
import React, {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react';
import type { PublicProvider } from 'types';
import { Link, Text, Title } from 'ui';
import { CheckboxField } from 'ui/CheckboxField';
import { useUserApi } from '../common/UserApiContext';
import { Types, useFinderState } from './FinderStateProvider';

export const LocationStep: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [filterAccessible, setFilterAccessible] = useState<boolean>(false);
    const [providers, setProviders] = useState<PublicProvider[]>([]);
    const api = useUserApi();
    const { dispatch } = useFinderState();

    useEffect(() => {
        api.getProvidersByZip(30363, 10).then((providers) => {
            setLoading(false);
            setProviders(providers);
        });
    }, [api]);

    const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        const id = event.currentTarget.dataset['id'];

        dispatch({
            type: Types.SET_PROVIDER,
            payload: { provider: providers[Number(id) - 1] },
        });
    };

    const onFilterAccessibleChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setFilterAccessible(event.currentTarget.checked);
    };

    return (
        <main>
            <BackLink href="/user/finder">
                <Trans id="user.finder.location.back-link">
                    Zurück zu den Terminauswahl
                </Trans>
            </BackLink>

            <Title variant="h1" as="h2">
                <Trans id="user.finder.location.title">Impfort</Trans>
            </Title>

            <Text>
                <Trans id="user.finder.location.intro">
                    Wählen Sie aus den möglichen Optionen, wo Sie geimpft werden
                    möchten.
                </Trans>
            </Text>

            <CheckboxField
                label={t({
                    id: 'user.finder.location.accessible.label',
                    message: 'Nur barrierefreie Impfzentren anzeigen',
                })}
                name="accessible"
                onChange={onFilterAccessibleChange}
            />

            <ul className="flex flex-col gap-2 mt-12 w-full">
                {providers
                    .filter((provider) => {
                        if (!filterAccessible) {
                            return true;
                        }

                        return provider.accessible;
                    })
                    .map((provider) => (
                        <li key={provider.id}>
                            <Link
                                href="/user/finder"
                                className="w-full no-underline "
                                onClick={onClick}
                                data-id={provider.id}
                            >
                                <ProviderCard provider={provider} />
                            </Link>
                        </li>
                    ))}
            </ul>
        </main>
    );
};
