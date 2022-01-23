import { Button, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import {
  AppointmentCard,
  CreateAppointmentModal,
  CreateAppointmentSeriesModal,
  WeekCalendar,
} from "components";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getProviderAppointments } from "stores/app";
import type { Appointment } from "vanellus";

enum Modal {
  APPOINTMENT,
  SERIES,
}

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const week = router.query.week as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);

  const refreshAppointments = useCallback(() => {
    getProviderAppointments(
      dayjs().toDate(),
      dayjs().add(7, "days").toDate()
    ).then(setAppointments);
  }, []);

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);

  const closeModal = () => {
    refreshAppointments();

    setModal(null);
  };

  return (
    <main>
      <PageHeader
        title={t({
          id: "provider.schedule.index.title",
          message: "Impftermine",
        })}
      >
        <div className="buttons-list">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setModal(Modal.APPOINTMENT)}
          >
            Impftermin anlegen
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setModal(Modal.SERIES)}
          >
            Impfserie anlegen
          </Button>
        </div>
      </PageHeader>

      <div className="flex flex-col flex-wrap gap-3 px-4 mb-10 w-full md:flex-row md:justify-between md:px-0">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            border
          />
        ))}
      </div>

      <WeekCalendar
        appointments={appointments}
        week={week ? Number(week) : undefined}
      />

      {modal === Modal.APPOINTMENT && (
        <CreateAppointmentModal onClose={closeModal} />
      )}

      {modal === Modal.SERIES && (
        <CreateAppointmentSeriesModal onClose={closeModal} />
      )}
    </main>
  );
};

export default SchedulePage;
