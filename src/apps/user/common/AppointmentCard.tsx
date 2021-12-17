import { Trans } from '@lingui/macro';
import { useI18n } from 'apps/common/useI18n';
import clsx from 'clsx';
import { vaccines } from 'config/vaccines';
import React from 'react';
import type { Appointment } from 'types';
import { Title } from 'ui';

interface AppointmentCardProps {
    appointment: Appointment;
    className?: string;
    border?: true | undefined;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
    children,
    appointment,
    className,
    border = false,
    ...props
}) => {
    const i18n = useI18n();

    return (
        <div
            className={clsx(
                'appointment-card',
                {
                    ['border']: border,
                },
                className
            )}
            {...props}
        >
            <address>
                <Title variant="h3" as="h3">
                    {appointment.provider.name}
                </Title>

                <span className="font-medium">
                    {appointment.provider.street},
                    <br />
                    {appointment.provider.zipCode} {appointment.provider.city}
                </span>
            </address>

            <time>
                <div className="text-4xl font-semibold">
                    <Trans id="user.finder.appointment.card.time">
                        {appointment.date.toLocaleTimeString(i18n.locale, {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        Uhr
                    </Trans>
                </div>

                <div className="text-xl font-semibold">
                    <Trans id="user.finder.appointment.card.date">
                        am{' '}
                        {appointment.date.toLocaleDateString(i18n.locale, {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })}
                    </Trans>
                </div>
            </time>

            <p className="vaccine">{vaccines.de[appointment.vaccine].name}</p>

            {/* button */}
            {children}
        </div>
    );
};
