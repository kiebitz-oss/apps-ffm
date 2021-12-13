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
        <div className="flex flex-col p-4 w-full font-semibold rounded-lg border-2 border-black">
            <address className="mb-2 text-center">
                <Title variant="h3">{appointment.provider.name}</Title>
                <br /> {appointment.provider.street}
                <br /> {appointment.provider.zipCode}{' '}
                {appointment.provider.city}
            </address>

            <time className="block text-lg text-center">
                {appointment.date.toLocaleDateString()},{' '}
                {appointment.date.toLocaleTimeString()}
            </time>

            <div className="text-center">
                <Trans>Impfstoff</Trans>:{' '}
                {vaccines.de[appointment.vaccine].name}
            </div>
        </div>
    );
};
