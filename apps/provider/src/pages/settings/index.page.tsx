import { Button, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useProviderApi } from "../ProviderApiContext";

const SettingsPage: NextPage = () => {
  const api = useProviderApi();

  const createTestSet = async () => {
    const series = await api.createAppointmentSeries(
      new Date(),
      new Date(),
      3,
      "moderna",
      3
    );

    api.publishAppointments(series.appointments);

    console.log(`PUBLISHED ${series.appointments.length} NEW APPOINTMENTS`);

    const appointments = await api.getAppointments(new Date(), new Date());

    console.log(`GOT ${appointments.length} APPOINTMENTS`);

    console.log(appointments);
  };

  return (
    <main>
      <Title>
        <Trans id="provider.settings.title">Einstellungen</Trans>
      </Title>

      <Button onClick={() => createTestSet()}>Create TestSet</Button>
    </main>
  );
};

export default SettingsPage;
