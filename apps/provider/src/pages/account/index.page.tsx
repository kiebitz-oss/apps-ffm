import { addNotification, Link, Page, PageHeader, Text } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { ProviderDataSummary } from "components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getProviderData,
  reset,
  setUnverifiedProvider,
  useApp,
} from "stores/app";
import { ProviderStatus } from "vanellus";

const SettingsPage: NextPage = () => {
  const [providerState, setProviderState] = useState<ProviderStatus>();
  const unverifiedProvider = useApp((state) => state.unverifiedProvider);
  const router = useRouter();

  useEffect(() => {
    getProviderData()
      .then((providerData) => {
        if (!unverifiedProvider && providerData.verifiedProvider) {
          setUnverifiedProvider(providerData.verifiedProvider);
        }

        if (
          unverifiedProvider &&
          JSON.stringify(unverifiedProvider) !==
            JSON.stringify(providerData.verifiedProvider)
        ) {
          setProviderState(ProviderStatus.UPDATED);
        } else if (providerData.verifiedProvider) {
          setProviderState(ProviderStatus.VERIFIED);
        } else {
          setProviderState(ProviderStatus.UNVERIFIED);
        }
      })
      .catch(() => {
        reset();

        addNotification("Bitte anmelden");

        router.push("/");
      });
  }, [providerState, unverifiedProvider, router]);

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

      {providerState !== ProviderStatus.VERIFIED && (
        <Text className="mb-8">
          <Trans id="provider.account.not-verified-yet">
            Ihre Daten wurden noch nicht verifiziert. Bitte haben Sie
            Verständnis, dass die Verifizierung bis zu 48h dauern kann.
          </Trans>
        </Text>
      )}

      {/* {providerState ? providerState : "--"} */}

      <div className="max-w-3xl">
        <ProviderDataSummary provider={unverifiedProvider} />
      </div>
    </Page>
  );
};

export default SettingsPage;
