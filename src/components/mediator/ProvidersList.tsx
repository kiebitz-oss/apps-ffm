import { CheckmarkOutline16, ErrorOutline16 } from "@carbon/icons-react";
import { t, Trans } from "@lingui/macro";
import { ChangeEventHandler, useState } from "react";
import type { Provider } from "types";
import { Button } from "ui";
import { ProviderRow } from "./ProviderRow";
import { ReconfirmProvidersModal } from "./ReconfirmProvidersModal";

interface ProviderTableProps {
  providers: Provider[];
}

export const ProviderList: React.FC<ProviderTableProps> = ({ providers }) => {
  const [modal, setModal] = useState<"confirm" | "unconfirm" | null>(null);
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
      <table className="table w-full striped selectable">
        <caption className="sr-only">
          <Trans id="mediator.providers-list.caption">
            Tabelle der Impfanbieter
          </Trans>
        </caption>
        <thead>
          <tr className="hover:bg-primary/10 cursor-pointer">
            <th scope="col" className="inline-flex items-center w-6">
              <input
                type="checkbox"
                className="checkbox"
                name="providers[]"
                onChange={onSelectAll}
                checked={selectedProviders.length === providers.length}
                aria-label={t({
                  id: "mediator.providers-list.select-all",
                  message: "Alle Impfanbieter auswählen oder abwählen",
                })}
              />
              &nbsp;
            </th>
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
          {providers.map((provider) => {
            return (
              <ProviderRow
                key={provider.id}
                provider={provider}
                selected={selectedProviders.includes(provider.id)}
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
                  className="flex gap-1 items-center"
                  disabled={selectedProviders.length === 0}
                  onClick={() => setModal("confirm")}
                >
                  <CheckmarkOutline16 />
                  <span>{selectedProviders.length}</span>
                  <Trans id="mediator.providers-list.button-confirm">
                    Anbieter bestätigen
                  </Trans>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex gap-1 items-center"
                  disabled={selectedProviders.length === 0}
                  onClick={() => setModal("unconfirm")}
                >
                  <ErrorOutline16 />
                  <span>{selectedProviders.length}</span>
                  <Trans id="mediator.providers-list.button-unconfirm">
                    Anbieter sperren
                  </Trans>
                </Button>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>

      {modal && (
        <ReconfirmProvidersModal
          providers={providers.filter((provider) =>
            selectedProviders.includes(provider.id)
          )}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};
