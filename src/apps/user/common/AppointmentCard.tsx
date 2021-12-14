import { Trans } from '@lingui/macro';
import { vaccines } from 'config/vaccines';
import React from 'react';
import type { Appointment } from 'types';
import { Title } from 'ui';

interface AppointmentCardProps {
    appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointment,
}) => {
    return (
        <div className="appointment-card">
            <address>
                <Title variant="h3">{appointment.provider.name}</Title>
                <br /> {appointment.provider.street}
                <br /> {appointment.provider.zipCode}{' '}
                {appointment.provider.city}
            </address>

            <time>
                {appointment.date.toLocaleDateString()},{' '}
                {appointment.date.toLocaleTimeString()}
            </time>

            <div>
                <Trans id="user.appointment-card.vaccine">Impfstoff</Trans>:{' '}
                {vaccines.de[appointment.vaccine].name}
            </div>
        </div>
    );
};
