import { Edit24 } from "@carbon/icons-react";
import { InputField, Link, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import { AppointmentsList } from "components/finder";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useApp } from "stores/app";
import { useFinder } from "stores/finder";

const AppointmentStep: NextPage = () => {
  const provider = useFinder((state) => state.provider);
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [oldDate, setOldDate] = useState<Date>();
  const booking = useApp((state) => state.booking);

  useEffect(() => {
    if (!oldDate || !dayjs(oldDate).isSame(dayjs(date), "day")) {
      setOldDate(date);
    }
  }, [date, oldDate]);

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      setDate(dayjs(event.currentTarget.value).toDate());
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
    <main>
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
          min={dayjs(date).format("YYYY-MM-DDTHH:mm")}
          max={dayjs(date).add(30, "days").format("YYYY-MM-DDTHH:mm")}
          defaultValue={dayjs(date).add(5, "minute").format("YYYY-MM-DDTHH:mm")}
        />
      </div>

      <Suspense fallback={null}>
        <AppointmentsList date={date} providerId={provider.id} />
      </Suspense>
    </main>
  );
};

export default AppointmentStep;
