import { Trans } from '@lingui/macro';
import { AppointmentSet } from 'helpers/AppointmentSet';
import React from 'react';
import { Title } from 'ui';
import { useProviderApi } from '../common/ProviderApiContext';

const SettingsPage: React.FC = () => {
    const api = useProviderApi();

    const set = AppointmentSet.createAppointmentSet(
        new Date('December 15, 2021 07:00:00'),
        new Date('December 15, 2021 21:00:00'),
        3,
        3,
        'moderna'
    );

    Promise.all(
        set.appointmentItems.map((appointmentItem) =>
            api.createAppointments(appointmentItem.appointment)
        )
    )
        .then(() => api.publishAppointments())
        .then(() => {
            console.log(
                `PUBLISHED ${set.appointmentItems.length} APPOINTMENTS`
            );
        });

    return (
        <main>
            <Title>
                <Trans id="provider.settings.title">Einstellungen</Trans>
            </Title>
        </main>
    );
};

export default SettingsPage;
