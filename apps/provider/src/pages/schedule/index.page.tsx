// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Button, Title } from "@kiebitz-oss/common";
import { useProviderApi } from "components/ProviderApiContext";
import { CreateAppointmentModal, WeekCalendar } from "components/schedule";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Appointment, AppointmentStatus } from "vanellus";

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const week = router.query.week as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
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

  const toggleModal = () => {
    refreshAppointments();

    setShowModal(!showModal);
  };

  return (
    <main className="content">
      <div className="flex flex-row justify-between w-full">
        <Title>Impftermine</Title>

        <Button size="sm" onClick={toggleModal}>
          Impftermin anlegen
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
      {showModal && <CreateAppointmentModal onClose={toggleModal} />}
    </main>
  );
};

export default SchedulePage;
