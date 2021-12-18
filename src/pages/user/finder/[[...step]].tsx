import { AppointmentStep } from "components/user/finder/AppointmentStep";
import { DateStep } from "components/user/finder/DateStep";
import { FinderStateProvider } from "components/user/finder/FinderStateProvider";
import { LocationStep } from "components/user/finder/LocationStep";
import { SuccessStep } from "components/user/finder/SuccessStep";
import { VerifyStep } from "components/user/finder/VerifyStep";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Wizard } from "ui";

const FinderPage: NextPage = () => {
  const router = useRouter();

  return (
    <FinderStateProvider>
      <Wizard step={(router.query?.step as string) || "location"}>
        <LocationStep />
        <AppointmentStep />
        <DateStep />
        <VerifyStep />
        <SuccessStep />
      </Wizard>
    </FinderStateProvider>
  );
};

export default FinderPage;
