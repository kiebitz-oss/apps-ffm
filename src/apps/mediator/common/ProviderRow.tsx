import clsx from 'clsx';
import React, { ChangeEventHandler } from 'react';
import type { Provider } from 'types';
import { Link } from 'ui';
import { Tag } from 'ui/Tag';

interface ProviderRowProps {
    provider: Provider;
    selected: boolean;
    onSelect: (providerId: string, selected: boolean) => void;
}

export const ProviderRow: React.FC<ProviderRowProps> = ({
    provider,
    selected = false,
    onSelect,
}) => {
    const providerLink = `/mediator/providers/${provider.id}`;

    const onSelectToggle: ChangeEventHandler<HTMLInputElement> = (event) => {
        onSelect(provider.id, event.currentTarget.checked);
    };

    return (
        <tr
            key={provider.id}
            className={clsx('provider-table-row', {
                ['selected']: selected,
            })}
        >
            <td>
                <input
                    type="checkbox"
                    className="checkbox"
                    name="providers[]"
                    onChange={onSelectToggle}
                    value={provider.id}
                    checked={selected}
                />
            </td>

            <td>
                <Link href={providerLink}>
                    {provider.name || 'Name missing'}
                </Link>
            </td>

            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                {provider.street}
                <br />
                {provider.zipCode} {provider.city}
            </td>

            <td>
                <Tag>{provider.verified ? 'bestätigt' : 'unbestätigt'}</Tag>
            </td>

            <td className="flex gap-4 justify-end">
                <Link href={providerLink}>anzeigen</Link>
            </td>
        </tr>
    );
};
