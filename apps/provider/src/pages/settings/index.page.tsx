import { Button, Title } from "@kiebitz-oss/common";
import { Trans } from "@lingui/macro";
import { useProviderApi } from "components/ProviderApiContext";
import { ProviderDataSummary } from "components/ProviderDataSummary";
import { ProviderForm } from "components/ProviderForm";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type { ProviderData } from "vanellus";

const SettingsPage: NextPage = () => {
  const api = useProviderApi();
  const [providerData, setProviderData] = useState<ProviderData>();

  useEffect(() => {
    api.getProviderData().then(setProviderData);
  }, [api]);

  const createTestSet = async () => {
    const series = await api.createAppointmentSeries(
      dayjs().add(1, "day").hour(9).toDate(),
      dayjs().add(1, "day").hour(17).toDate(),
      5,
      "moderna",
      3
    );

    await api.publishAppointments(series.appointments);
  };

  return (
    <main>
      <Title>
        <Trans id="provider.settings.title">Einstellungen</Trans>
      </Title>

      {providerData?.verifiedProvider && (
        <ProviderDataSummary provider={providerData?.verifiedProvider} />
      )}

      <ProviderForm
        defaultValues={providerData?.verifiedProvider || {}}
        onSubmit={(data) => {
          console.log(data);
        }}
      />

      <Button onClick={() => createTestSet()}>Create TestSet</Button>
    </main>
  );
};

export default SettingsPage;
