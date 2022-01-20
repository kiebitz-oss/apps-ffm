import { Link, Text, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { useProviderApi } from "components/ProviderApiContext";
import { ProviderForm } from "components/ProviderForm";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const api = useProviderApi();
  const [providerData, setProviderData] = useState<ProviderData>();

  useEffect(() => {
    api.getProviderData().then(setProviderData);
  }, [api]);

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
        <ProviderForm
          defaultValues={providerData?.verifiedProvider || {}}
          submitText={t({
            id: "provider.account.edit.submit-button",
            message: "Daten zur Verifizierung speichern",
          })}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </div>
    </main>
  );
};

export default SettingsPage;
