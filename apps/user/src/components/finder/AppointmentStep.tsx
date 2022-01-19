import { Edit24 } from "@carbon/icons-react";
import { BackLink, InputField, Link, Title } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import { useRouter } from "next/router";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import type { AggregatedPublicAppointment } from "vanellus";
import { dayjs } from "../../../../../packages/vanellus/src/utils";
import { AppointmentCardSelector } from "./AppointmentCardSelector";
import { useFinder } from "./FinderProvider";

export const AppointmentStep: React.FC = () => {
  const { setProvider, provider } = useFinder();
  const { api } = useApp();
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<
    AggregatedPublicAppointment[]
  >([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    AggregatedPublicAppointment[]
  >([]);

  useEffect(() => {
    const now = dayjs().utc().toDate();

    api.getAppointments(now, "10000", "99999").then(setAppointments);
  }, [date, api]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) =>
        dayjs(appointment.startDate).isAfter(dayjs(date).utc(), "minute")
      )
    );
  }, [appointments, date]);

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      setDate(dayjs(event.currentTarget.value).utc().toDate());
    },
    [setDate]
  );

  const handleResetProvider: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.currentTarget.value === "") {
        setProvider(null);
      }
    },
    [setProvider]
  );

  if (!provider) {
    router.push("/finder");

    return null;
  }

  return (
    <main id="finder-appointment">
      <BackLink href="/finder">
        <Trans id="user.finder.appointment.back-link">
          Zurück zur Auswahl der Impfstelle
        </Trans>
      </BackLink>

      <Title variant="h1" as="h2" className="ml-4 sm:ml-0">
        <Trans id="user.finder.appointment.title">Termine</Trans>
      </Title>

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
            href="/finder/location"
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
          defaultValue={dayjs(date).utc().toISOString().substring(0, 16)}
        />
      </div>

      {/* {state.loading && <div>Loading</div>} */}

      {filteredAppointments.length < 1 && (
        <Trans id="user.finder.appointment.no-result">
          Es sind keine freien Termine verfügbar.
          <br />
          Bitte versuchen Sie einen späteren Zeitpunkt oder ein anderen
          Impfstelle.
        </Trans>
      )}

      {filteredAppointments.length > 0 && (
        <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCardSelector
              appointment={appointment}
              key={appointment.id}
            />
          ))}
        </div>
      )}
    </main>
  );
};
