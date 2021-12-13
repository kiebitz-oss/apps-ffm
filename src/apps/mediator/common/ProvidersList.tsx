import { CheckmarkOutline16, ErrorOutline16 } from '@carbon/icons-react';
import { t, Trans } from '@lingui/macro';
import React, { ChangeEventHandler, useState } from 'react';
import type { Provider } from 'types';
import { Button } from 'ui';
import { ProviderRow } from './ProviderRow';

interface ProviderTableProps {
    providers: Provider[];
}

export const ProviderTable: React.FC<ProviderTableProps> = ({ providers }) => {
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

    const onSelectAll: ChangeEventHandler<HTMLInputElement> = (event) => {
        const checked = event.currentTarget.checked;

        setSelectedProviders(
            checked ? providers.map((provider) => provider.id) : []
        );
    };

    const onSelect = (providerId: string, isSelected: boolean) => {
        setSelectedProviders(
            isSelected
                ? !selectedProviders.includes(providerId)
                    ? [...selectedProviders, providerId]
                    : selectedProviders
                : selectedProviders.filter(
                      (selectedProviderId) => selectedProviderId !== providerId
                  )
        );
    };

    return (
        <>
            <table className="providers-table">
                <caption className="sr-only">
                    <Trans id="mediator.providers-list.caption">
                        Tabelle der Impfanbieter
                    </Trans>
                </caption>
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="inline-flex items-center w-6"
                        >
                            <input
                                type="checkbox"
                                className="checkbox"
                                name="providers[]"
                                onChange={onSelectAll}
                                checked={
                                    selectedProviders.length ===
                                    providers.length
                                }
                                aria-label={t({
                                    id: 'mediator.providers-list.select-all',
                                    message:
                                        'Alle Impfanbieter auswählen oder abwählen',
                                })}
                            />
                            &nbsp;
                        </th>
                        <th scope="col">
                            <Trans id="mediator.providers-list.name">
                                Name
                            </Trans>
                        </th>
                        <th scope="col">
                            <Trans id="mediator.providers-list.address">
                                Adresse
                            </Trans>
                        </th>
                        <th scope="col">
                            <Trans id="mediator.providers-list.status">
                                Status
                            </Trans>
                        </th>
                        <th scope="col">
                            <span className="sr-only">Aktionen</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {providers.map((provider) => {
                        return (
                            <ProviderRow
                                key={provider.id}
                                provider={provider}
                                selected={selectedProviders.includes(
                                    provider.id
                                )}
                                onSelect={onSelect}
                            />
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={5}>
                            <div className="flex gap-2 justify-end mt-4 ml-auto">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    disabled={selectedProviders.length === 0}
                                >
                                    <CheckmarkOutline16 />
                                    {selectedProviders.length} 
                                    <Trans id="mediator.providers-list.button-verify">
                                        Anbieter bestätigen
                                    </Trans>
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    disabled={selectedProviders.length === 0}
                                >
                                    <ErrorOutline16 />
                                    {selectedProviders.length} 
                                    <Trans id="mediator.providers-list.button-unverify">
                                        Anbieter sperren
                                    </Trans>
                                </Button>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};
