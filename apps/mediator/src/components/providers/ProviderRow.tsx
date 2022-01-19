import { Link, Tag } from "@kiebitz-oss/common";
import { t, Trans } from "@lingui/macro";
import clsx from "clsx";
import { ChangeEventHandler, useRef } from "react";
import type { Provider } from "vanellus";

export interface ProviderRowProps {
  provider: Provider;
  selected: boolean;
  onSelect: (providerId: string, selected: boolean) => void;
}

export const ProviderRow: React.FC<ProviderRowProps> = ({
  provider,
  selected = false,
  onSelect,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const providerLink = `/providers/${encodeURIComponent(
    Buffer.from(provider.id).toString("hex")
  )}`;

  const onSelectToggle: ChangeEventHandler<unknown> = () => {
    onSelect(provider.id, !selected);
  };

  return (
    <tr
      key={provider.id}
      className={clsx("provider-table-row", {
        ["selected"]: selected,
      })}
      onClick={onSelectToggle}
    >
      <td>
        <input
          type="checkbox"
          className="checkbox"
          name="providers[]"
          onChange={onSelectToggle}
          value={provider.id}
          checked={selected}
          ref={ref}
          aria-label={t({
            id: "mediator.provider-row.select-row",
            message: "Impfanbieter auswählen oder abwählen",
          })}
        />
      </td>

      <td>
        <Link href={providerLink}>{provider.name || "Name missing"}</Link>
      </td>

      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
        {provider.street}
        <br />
        {provider.zipCode} {provider.city}
      </td>

      <td>
        <Tag variant={provider.verified ? "success" : "warning"}>
          {provider.verified ? (
            <Trans id="mediator.provider-row.valid">bestätigt</Trans>
          ) : (
            <Trans id="mediator.provider-row.invalid">unbestätigt</Trans>
          )}
        </Tag>
      </td>

      <td className="flex gap-4 justify-end">
        <Link href={providerLink}>
          <Trans id="mediator.provider-row.button-show">anzeigen</Trans>
        </Link>
      </td>
    </tr>
  );
};
