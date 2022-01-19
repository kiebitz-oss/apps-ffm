// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Button, Title } from "@impfen/common";
import { useProviderApi } from "components/ProviderApiContext";
import { CreateAppointmentModal, WeekCalendar } from "components/schedule";
import { CreateAppointmentSeriesModal } from "components/schedule/CreateAppointmentSeriesModal";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Appointment, AppointmentStatus } from "vanellus";

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
      <div className="flex flex-row justify-between w-full">
        <Title>Impftermine</Title>

        <Button size="sm" onClick={() => setModal(Modal.APPOINTMENT)}>
          Impftermin anlegen
        </Button>

        <Button size="sm" onClick={() => setModal(Modal.SERIES)}>
          Impfserie anlegen
        </Button>
      </div>

      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <div>
              {appointment.startDate.toLocaleString()} (
              {appointment.bookings.length}/{appointment.slotData.length}) [
              {appointment.status}]{" "}
              {appointment.status !== AppointmentStatus.CANCELED && (
                <button onClick={() => api.cancelAppointment(appointment)}>
                  Cancel
                </button>
              )}
            </div>
            {appointment.bookings ? (
              <ul>
                {appointment.bookings.map((booking) => (
                  <li key={booking.slotId}>{booking.code}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>

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
