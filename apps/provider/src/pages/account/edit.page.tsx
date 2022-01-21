import { Link, Text, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { getProviderData, storeProvider } from "actions";
import { ProviderForm } from "components";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { Provider, ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const [providerData, setProviderData] = useState<ProviderData>();

  const handleOnSubmit: SubmitHandler<Provider> = useCallback(async (data) => {
    const x = await storeProvider(data);
    console.log(x);
  }, []);

  useEffect(() => {
    getProviderData().then(setProviderData);
  }, []);

  return (
    <main>
      <div className="flex flex-row justify-between mb-8">
        <Title>
          <Trans id="provider.account.edit.title">
            Ihren Account bearbeiten
          </Trans>
        </Title>

        <div className="buttons-list">
          <Link href="/account" type="button" className="primary sm">
            Ihre Daten anzeigen
          </Link>
        </div>
      </div>

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
