// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { WeekCalendar } from 'apps/provider/common/WeekCalendar';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import type { Appointment } from 'types';
import { Button, Title } from 'ui';
import { useProviderApi } from '../common/ProviderApiContext';
import { CreateAppointmentModal } from './CreateAppointmentModal';

const SchedulePage: React.FC = () => {
    const { week } = useParams<{ week?: string }>();
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
