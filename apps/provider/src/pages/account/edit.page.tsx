import { Link, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderForm } from "components";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { getProviderData, storeProvider } from "stores/app";
import type { Provider, ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const [providerData, setProviderData] = useState<ProviderData>();

  const handleOnSubmit: SubmitHandler<Provider> = useCallback(async (data) => {
    await storeProvider(data);
  }, []);

  useEffect(() => {
    getProviderData().then(setProviderData);
  }, []);

  return (
    <main>
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
        {providerData?.verifiedProvider && (
          <ProviderForm
            defaultValues={providerData.verifiedProvider}
            submitText={t({
              id: "provider.account.edit.submit-button",
              message: "Daten zur Verifizierung speichern",
            })}
            onSubmit={handleOnSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
