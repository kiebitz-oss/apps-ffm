import { Edit24 } from '@carbon/icons-react';
import { t, Trans } from '@lingui/macro';
import { appointments } from 'apps/data';
import React, { ChangeEventHandler } from 'react';
import type { Appointment } from 'types';
import { Button, InputField, Link, Title } from 'ui';
import { Types, useFinderState } from './FinderStateProvider';

interface AppointmentCardProps {
    appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const { dispatch } = useFinderState();

    const onAppointmentSelect: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const appointmentId = event.currentTarget.dataset.id;

        if (appointmentId) {
            const appointment = appointments.find(
                (appointment) => appointment.id === appointmentId
            );

            if (appointment) {
                dispatch({
                    type: Types.SET_APPOINTMENT,
                    payload: {
                        appointment,
                    },
                });
            }
        }
    };

    return (
        <Link
            href="/user/finder/verify"
            className="group flex-grow p-4 -mx-4 text-center no-underline rounded-md border shadow-lg hover:shadow-2xl focus:shadow-2xl sm:mx-0"
            onClick={onAppointmentSelect}
            data-id={appointment.id}
        >
            <address className="mb-2 text-center">
                <Title variant="h3">{appointment.provider.name}</Title>
                <span className="font-medium">
                    {appointment.provider.street},
                    <br />
                    {appointment.provider.zipCode} {appointment.provider.city}
                </span>
            </address>

            <time className="block mb-6 text-center">
                <span className="text-4xl font-semibold">15:23 Uhr</span>
                <br />
                <span className="text-xl font-semibold">am 19.12.21</span>
            </time>

            <p className="mb-6">Impfstoff: BioNTech/Pfizer</p>

            <Button
                className="group-hover:bg-blue-700 group-focus:bg-blue-700 shadow-lg select-none"
                tabIndex={-1}
            >
                <Trans id="user.finder.appointment.card.submit">
                    Termin auswählen
                </Trans>
            </Button>
        </Link>
    );
};

export const AppointmentStep: React.FC = () => {
    const { dispatch, state } = useFinderState();

    const onDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const date = event.currentTarget.valueAsDate;

        dispatch({
            type: Types.SET_DATE,
            payload: { date: date || new Date() },
        });
    };

    return (
        <main>
            <Title variant="h1" as="h2">
                <Trans id="user.finder.appointment.title">Termine</Trans>
            </Title>

            <div className="flex flex-col gap-6 items-stretch mb-8 w-full md:flex-row md:justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <InputField
                        name="provider"
                        type="search"
                        placeholder={t({
                            id: 'user.finder.appointment.provider.placeholder',
                            message: 'Beliebige Impfstelle',
                        })}
                        value={state.provider?.name}
                    />
                    <Link
                        href="/user/finder/location"
                        className="inline-flex justify-center items-center w-10 h-10 text-white no-underline bg-primary-500 rounded-lg shadow"
                    >
                        <Edit24 />
                    </Link>
                </div>
                <InputField
                    name="date"
                    type="datetime-local"
                    placeholder={t({
                        id: 'user.finder.appointment.time.placeholder',
                        message: 'Beliebige Zeit',
                    })}
                    onChange={onDateChange}
                    defaultValue={state.date.toISOString().substring(0, 16)}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                {appointments.map((appointment) => (
                    <AppointmentCard
                        appointment={appointment}
                        key={appointment.id}
                    />
                ))}
            </div>

            <button className="py-2 px-6 my-8 mx-auto text-lg font-semibold bg-gray-300 rounded-lg shadow-lg">
                <Trans id="user.finder.appointment.submit">
                    Weitere Termine laden
                </Trans>
            </button>
        </main>
    );
};
