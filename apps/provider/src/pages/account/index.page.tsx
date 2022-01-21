import { Link, Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { getProviderData } from "actions";
import { ProviderDataSummary } from "components";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const [providerData, setProviderData] = useState<ProviderData>();

  useEffect(() => {
    getProviderData().then(setProviderData);
  }, []);

  return (
    <main>
      <div className="flex flex-row justify-between mb-8">
        <Title>
          <Trans id="provider.account.index.title">Ihr Account</Trans>
        </Title>

        <div className="buttons-list">
          <Link href="/account/edit" type="button" className="primary sm">
            Ihre Daten bearbeiten
          </Link>
        </div>
      </div>

      {!providerData?.verifiedProvider && (
        <Text className="mb-8">
          <Trans id="provider.account.not-verified-yet">
            Ihre Daten wurden noch nicht verifiziert. Bitte haben Sie
            Verständnis, dass die Verifizierung bis zu 48h dauern kann.
          </Trans>
        </Text>
      )}

      {providerData?.verifiedProvider && (
        <ProviderDataSummary provider={providerData?.verifiedProvider} />
      )}
    </main>
  );
};

export default SettingsPage;
