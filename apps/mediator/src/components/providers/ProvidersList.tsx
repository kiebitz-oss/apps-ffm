import { Trans } from "@lingui/macro";
import type { Provider } from "vanellus";
import { ProviderRow } from "./ProviderRow";

export interface ProviderListProps {
  providers: Provider[];
}

export const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  return (
    <>
      <table className="providers-list">
        <caption className="sr-only">
          <Trans id="mediator.providers-list.caption">
            Tabelle der Impfanbieter
          </Trans>
        </caption>

        <thead>
          <tr>
            <th scope="col">
              <Trans id="mediator.providers-list.name">Name</Trans>
            </th>

            <th scope="col">
              <Trans id="mediator.providers-list.address">Adresse</Trans>
            </th>

            <th scope="col">
              <Trans id="mediator.providers-list.status">Status</Trans>
            </th>

            <th scope="col">
              <span className="sr-only">Aktionen</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {providers.map((provider) => (
            <ProviderRow key={provider.id} provider={provider} />
          ))}
        </tbody>
      </table>
    </>
  );
};
