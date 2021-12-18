// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { useProviderApi } from "components/provider/common/ProviderApiContext";
import { WeekCalendar } from "components/provider/common/WeekCalendar";
import { CreateAppointmentModal } from "components/provider/schedule/CreateAppointmentModal";
import { useRouter } from "next/router";
import { useState } from "react";
import type { Appointment } from "types";
import { Button, Title } from "ui";

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const week = router.query.week as string;
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const api = useProviderApi();

  api.getAppointments().then((appointments) => {
    setAppointments(appointments);
  });

  const toggleModal = () => {
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

      <WeekCalendar
        appointments={appointments}
        week={week ? Number(week) : undefined}
      />
      {showModal && <CreateAppointmentModal onClose={toggleModal} />}
    </main>
  );
};

export default SchedulePage;
