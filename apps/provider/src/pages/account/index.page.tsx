import { Link, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderDataSummary } from "components";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getProviderData } from "stores/app";
import type { ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const [providerData, setProviderData] = useState<ProviderData>();

  useEffect(() => {
    getProviderData().then(setProviderData);
  }, []);

  return (
    <main>
      <PageHeader
        title={t({
          id: "provider.account.index.title",
          message: "Account",
        })}
      >
        <div className="buttons-list">
          <Link
            href="/account/edit"
            type="button"
            variant="secondary"
            size="sm"
          >
            <Trans id="provider.account.index.edit-button">
              Account bearbeiten
            </Trans>
          </Link>
        </div>
      </PageHeader>

      {!providerData?.verifiedProvider && (
        <Text className="mb-8">
          <Trans id="provider.account.not-verified-yet">
            Ihre Daten wurden noch nicht verifiziert. Bitte haben Sie
            Verständnis, dass die Verifizierung bis zu 48h dauern kann.
          </Trans>
        </Text>
      )}

      {providerData?.verifiedProvider && (
        <div className="max-w-3xl">
          <ProviderDataSummary provider={providerData?.verifiedProvider} />
        </div>
      )}
    </main>
  );
};

export default SettingsPage;
