import { Link, Page, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderDataSummary } from "components";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getProviderData, setUnverifiedProvider, useApp } from "stores/app";

const SettingsPage: NextPage = () => {
  const [providerState, setProviderState] = useState<
    "unverified" | "verified" | "updated"
  >();
  const unverifiedProvider = useApp((state) => state.unverifiedProvider);

  useEffect(() => {
    getProviderData().then((providerData) => {
      if (!unverifiedProvider && providerData.verifiedProvider) {
        setUnverifiedProvider(providerData.verifiedProvider);
      }

      if (
        unverifiedProvider &&
        JSON.stringify(unverifiedProvider) !==
          JSON.stringify(providerData.verifiedProvider)
      ) {
        setProviderState("updated");
      } else if (providerData.verifiedProvider) {
        setProviderState("verified");
      } else {
        setProviderState("unverified");
      }
    });
  }, [providerState, unverifiedProvider]);

  // saveguard
  if (!unverifiedProvider) {
    return null;
  }

  return (
    <Page>
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

      {providerState !== "verified" && (
        <Text className="mb-8">
          <Trans id="provider.account.not-verified-yet">
            Ihre Daten wurden noch nicht verifiziert. Bitte haben Sie
            Verständnis, dass die Verifizierung bis zu 48h dauern kann.
          </Trans>
        </Text>
      )}

      {providerState ? providerState : "--"}

      <div className="max-w-3xl">
        <ProviderDataSummary provider={unverifiedProvider} />
      </div>
    </Page>
  );
};

export default SettingsPage;
