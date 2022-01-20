import { Link, Tag } from "@impfen/common";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import type { Provider } from "vanellus";

export interface ProviderRowProps {
  provider: Provider;
}

export const ProviderRow: React.FC<ProviderRowProps> = ({ provider }) => {
  const providerLink = `/providers/${encodeURIComponent(
    Buffer.from(provider.id).toString("hex")
  )}`;

  return (
    <tr key={provider.id} className={clsx("providers-list-row")}>
      <td>
        <Link href={providerLink}>{provider.name}</Link>
      </td>

      <td className="py-4 px-6 ">
        <address className="text-sm text-gray-500 whitespace-nowrap">
          {provider.street}
          <br />
          {provider.zipCode} {provider.city}
        </address>
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
