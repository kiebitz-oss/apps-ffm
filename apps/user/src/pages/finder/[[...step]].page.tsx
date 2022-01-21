import { getBooking } from "actions";
import {
  AppointmentStep,
  DateStep,
  FinderProvider,
  LocationStep,
  SuccessStep,
  VerifyStep,
} from "components";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

enum Step {
  location = "location",
  appointment = "appointment",
  date = "date",
  verify = "verify",
  success = "success",
}

const defaultStep = Step.location;

interface StepRendererProps {
  step: Step;
}

const StepRenderer: React.FC<StepRendererProps> = ({ step }) => {
  switch (step) {
    case Step.appointment: {
      return <AppointmentStep />;
    }

    case Step.date: {
      return <DateStep />;
    }

    case Step.verify: {
      return <VerifyStep />;
    }

    case Step.success: {
      return <SuccessStep />;
    }

    case Step.location:
    default:
      return <LocationStep />;
  }
};

interface FinderPageProps {
  step?: Step;
}

const FinderPage: NextPage<FinderPageProps> = ({ step = defaultStep }) => {
  const router = useRouter();
  const booking = getBooking();

  if (booking && !router.asPath.startsWith("/finder/success")) {
    router.push("/finder/success");

    return null;
  }

  return (
    <FinderProvider>
      <StepRenderer step={step} />
    </FinderProvider>
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
