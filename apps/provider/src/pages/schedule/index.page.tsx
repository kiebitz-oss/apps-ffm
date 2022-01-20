import { Button, Title } from "@impfen/common";
import { useProviderApi } from "components/ProviderApiContext";
import {
  AppointmentCard,
  CreateAppointmentModal,
  WeekCalendar,
} from "components/schedule";
import { CreateAppointmentSeriesModal } from "components/schedule/CreateAppointmentSeriesModal";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Appointment } from "vanellus";

enum Modal {
  APPOINTMENT,
  SERIES,
}

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const week = router.query.week as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);

  const api = useProviderApi();

  const refreshAppointments = useCallback(() => {
    api
      .getProviderAppointments(
        dayjs().toDate(),
        dayjs().add(7, "days").toDate()
      )
      .then(setAppointments);
  }, [api]);

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);

  const closeModal = () => {
    refreshAppointments();

    setModal(null);
  };

  return (
    <main className="content">
      <div className="flex flex-row justify-between mb-8 w-full">
        <Title>Impftermine</Title>

        <div className="buttons-list">
          <Button size="sm" onClick={() => setModal(Modal.APPOINTMENT)}>
            Impftermin anlegen
          </Button>

          <Button size="sm" onClick={() => setModal(Modal.SERIES)}>
            Impfserie anlegen
          </Button>
        </div>
      </div>

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
