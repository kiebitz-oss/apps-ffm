import { Edit24 } from "@carbon/icons-react";
import { InputField, Link, Page, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import { AppointmentsList } from "components/finder";
import dayjs, { Dayjs } from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useApp } from "stores/app";
import { useFinder } from "stores/finder";

const AppointmentStep: NextPage = () => {
  const provider = useFinder((state) => state.provider);
  const router = useRouter();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [oldDate, setOldDate] = useState<Dayjs>();
  const booking = useApp((state) => state.booking);

  useEffect(() => {
    if (!oldDate || !oldDate.isSame(date, "day")) {
      setOldDate(date);
    }
  }, [date, oldDate]);

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      setDate(dayjs(event.currentTarget.value));
    },
    [setDate]
  );

  const handleResetProvider: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.currentTarget.value === "") {
        router.push("/finder");
      }
    },
    [router]
  );

  if (!provider) {
    router.push("/finder");

    return null;
  }

  if (booking) {
    router.push("/finder/success");

    return null;
  }

  return (
    <Page>
      <PageHeader
        title={t({
          id: "user.finder.appointment.title",
          message: "Termine",
        })}
        backLink={{
          title: t({
            id: "user.finder.appointment.back-link",
            message: "Zurück zur Auswahl der Impfstelle",
          }),
          href: "/finder",
        }}
      />

      <div className="flex flex-col gap-5 px-4 mb-10 w-full md:flex-row md:justify-between md:px-0">
        <div className="flex flex-row gap-2 items-center">
          <InputField
            name="provider"
            type="search"
            placeholder={t({
              id: "user.finder.appointment.provider.placeholder",
              message: "Beliebige Impfstelle",
            })}
            value={provider.name}
            onChange={handleResetProvider}
            className="flex-1"
          />
          <Link
            href="/finder"
            className="inline-flex justify-center items-center w-10 h-10 text-white hover:text-white no-underline bg-primary rounded shadow"
          >
            <Edit24 />
          </Link>
        </div>

        <InputField
          name="date"
          type="datetime-local"
          placeholder={t({
            id: "user.finder.appointment.time.placeholder",
            message: "Beliebige Zeit",
          })}
          onChange={handleDateChange}
          min={date.format("YYYY-MM-DDTHH:mm")}
          max={date.add(30, "days").format("YYYY-MM-DDTHH:mm")}
          defaultValue={date.add(5, "minute").format("YYYY-MM-DDTHH:mm")}
        />
      </div>

      <Suspense fallback={null}>
        <AppointmentsList date={date} providerId={provider.id} />
      </Suspense>
    </Page>
  );
};

export default AppointmentStep;
