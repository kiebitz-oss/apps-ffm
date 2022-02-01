import { addNotification, Link, Page, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderForm } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import type { SubmitHandler } from "react-hook-form";
import { storeProvider, useApp } from "stores/app";
import type { Provider } from "vanellus";

const SettingsPage: NextPage = () => {
  const provider = useApp((state) => state.unverifiedProvider);
  const router = useRouter();

  const handleOnSubmit: SubmitHandler<Provider> = useCallback(
    async (data) => {
      await storeProvider(data)
        .then(() => {
          addNotification("Daten gespeichert");

          return router.push("/account");
        })
        .catch(() => {
          addNotification("Speichern fehlgeschlagen");

          return router.push("/account");
        });
    },
    [router]
  );

  return (
    <Page>
      <PageHeader
        title={t({
          id: "provider.account.edit.title",
          message: "Account bearbeiten",
        })}
      >
        <div className="buttons-list">
          <Link href="/account" type="button" variant="secondary" size="sm">
            <Trans id="provider.account.edit.index-button">
              Account ansehen
            </Trans>
          </Link>
        </div>
      </PageHeader>

      <Text className="mb-8">
        <Trans id="provider.account.edit.notice-validation">
          Bitte beachten Sie, dass Änderungen Ihrer Daten einen
          Verifizierungsprozess durchlaufen und erst nach Bestätigung für
          Impflinge sichtbar werden.
        </Trans>
      </Text>

      <div className="max-w-3xl">
        <ProviderForm
          defaultValues={provider}
          submitText={t({
            id: "provider.account.edit.submit-button",
            message: "Daten zur Verifizierung speichern",
          })}
          onSubmit={handleOnSubmit}
        />
      </div>
    </Page>
  );
};

export default SettingsPage;
