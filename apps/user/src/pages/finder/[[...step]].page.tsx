import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { AppointmentStep } from "./AppointmentStep";
import { DateStep } from "./DateStep";
import { FinderStateProvider } from "./FinderStateProvider";
import { LocationStep } from "./LocationStep";
import { SuccessStep } from "./SuccessStep";
import { VerifyStep } from "./VerifyStep";

enum Steps {
  location = "location",
  appointment = "appointment",
  date = "date",
  verify = "verify",
  success = "success",
}

const defaultStep = Steps.location;

const StepRenderer: React.FC<{ step: string }> = ({ step }) => {
  switch (step) {
    case Steps.appointment: {
      return <AppointmentStep />;
    }

    case Steps.date: {
      return <DateStep />;
    }

    case Steps.verify: {
      return <VerifyStep />;
    }

    case Steps.success: {
      return <SuccessStep />;
    }

    case Steps.location:
    default:
      return <LocationStep />;
  }
};

const FinderPage: NextPage<{ step?: Steps }> = ({ step = defaultStep }) => {
  return (
    <FinderStateProvider>
      <StepRenderer step={step} />
    </FinderStateProvider>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      step: params?.step?.[0] || defaultStep,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      "/finder/",
      "/finder/location",
      "/finder/appointment",
      "/finder/date",
      "/finder/verify",
      "/finder/success",
    ],
    fallback: false,
  };
};

export default FinderPage;
