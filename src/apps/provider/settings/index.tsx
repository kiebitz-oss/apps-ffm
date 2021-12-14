import { Trans } from '@lingui/macro';
import { AppointmentSet } from 'helpers/AppointmentSet';
import React from 'react';
import { Button, Title } from 'ui';
import { useProviderApi } from '../common/ProviderApiContext';

const SettingsPage: React.FC = () => {
    const api = useProviderApi();

    const createTestSet = async () => {
        const set = AppointmentSet.createAppointmentSet(
            new Date('December 15, 2021 07:00:00'),
            new Date('December 15, 2021 21:00:00'),
            3,
            3,
            'moderna'
        );

        await api.refetchAppointments();

        await Promise.all(
            set.appointmentItems.map((appointmentItem) =>
                api.createAppointments(appointmentItem.appointment)
            )
        );

        await api.publishAppointments();

        console.log(
            `PUBLISHED ${set.appointmentItems.length} NEW APPOINTMENTS`
        );

        const appointments = await api.getAppointments();

        console.log(`GOT ${appointments.length} APPOINTMENTS`);

        console.log(appointments);
    };

    return (
        <main>
            <Title>
                <Trans id="provider.settings.title">Einstellungen</Trans>
            </Title>

            <Button onClick={() => createTestSet()}>Create TestSet</Button>
        </main>
    );
};

export default SettingsPage;
