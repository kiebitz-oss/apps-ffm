import { Button, Page, PageHeader, Vaccine } from "@impfen/common";
import { t } from "@lingui/macro";
import {
  CreateAppointmentModal,
  CreateAppointmentSeriesModal,
} from "components";
import { WeekCalendar } from "components/WeekCalendar/WeekCalendar";
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
  const [appointments, setAppointments] = useState<Appointment<Vaccine>[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);

  const refreshAppointments = useCallback(() => {
    getProviderAppointments(dayjs(), dayjs().add(14, "days")).then(
      setAppointments
    );
  }, []);

  useEffect(() => {
    refreshAppointments();
  }, [refreshAppointments]);

  const closeModal = () => {
    refreshAppointments();

    setModal(null);
  };

  return (
    <Page>
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
    </Page>
  );
};

export default SchedulePage;
