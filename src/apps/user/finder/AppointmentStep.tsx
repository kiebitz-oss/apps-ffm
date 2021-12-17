import { Edit24 } from '@carbon/icons-react';
import { t, Trans } from '@lingui/macro';
import { BackLink } from 'apps/common/BackLink';
import { appointments } from 'apps/data';
import React, {
    ChangeEventHandler,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react';
import type { Appointment } from 'types';
import { Button, Error, InputField, Link, Title } from 'ui';
import { AppointmentCard } from '../common/AppointmentCard';
import { Types, useFinderState } from './FinderStateProvider';

interface AppointmentCardProps {
    appointment: Appointment;
}

const AppointmentCardSelector: React.FC<AppointmentCardProps> = ({
    appointment,
}) => {
    const { dispatch } = useFinderState();

    const onAppointmentSelect: MouseEventHandler<HTMLAnchorElement> = (
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
            className="group card"
            onClick={onAppointmentSelect}
            data-id={appointment.id}
        >
            <AppointmentCard appointment={appointment}>
                <Button tabIndex={-1}>
                    <Trans id="user.finder.appointment.card.submit">
                        Termin auswählen
                    </Trans>
                </Button>
            </AppointmentCard>
        </Link>
    );
};

export const AppointmentStep: React.FC = () => {
    const [filteredAppointments, setFilteredAppointments] =
        useState(appointments);
    const { dispatch, state } = useFinderState();

    useEffect(() => {
        const filteredAppointments = appointments.filter((appointment) => {
            if (state.provider) {
                return state.provider.id === appointment.provider.id;
            }

            return true;
        });

        setFilteredAppointments(filteredAppointments);
    }, [state.provider]);

    const onDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const date = event.currentTarget.valueAsDate;

        dispatch({
            type: Types.SET_DATE,
            payload: { date: date || new Date() },
        });
    };

    const onResetProvider: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.currentTarget.value === '') {
            dispatch({
                type: Types.SET_PROVIDER,
                payload: { provider: null },
            });
        }
    };

    return (
        <main id="finder-appointment">
            <BackLink href="/user/finder">
                <Trans id="user.finder.appointment.back-link">
                    Zurück zur Auswahl der Impfstelle
                </Trans>
            </BackLink>

            <Title variant="h1" as="h2">
                <Trans id="user.finder.appointment.title">Termine</Trans>
            </Title>

            <div className="controls">
                <div className="flex flex-row gap-2 items-center">
                    <InputField
                        name="provider"
                        type="search"
                        placeholder={t({
                            id: 'user.finder.appointment.provider.placeholder',
                            message: 'Beliebige Impfstelle',
                        })}
                        value={state.provider?.name}
                        onChange={onResetProvider}
                        className="flex-1"
                    />
                    <Link
                        href="/user/finder/location"
                        className="inline-flex justify-center items-center w-10 h-10 text-white no-underline bg-primary rounded-lg shadow"
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

            {filteredAppointments.length === 0 ? (
                <Error className="mx-auto">
                    <Trans id="user.finder.appointment.no-result">
                        Es sind keine freien Termine verfügbar.
                        <br />
                        Bitte versuchen Sie einen späteren Zeitpunkt oder ein
                        anderen Impfstelle.
                    </Trans>
                </Error>
            ) : (
                <div className="appointment-grid">
                    {filteredAppointments.map((appointment) => (
                        <AppointmentCardSelector
                            appointment={appointment}
                            key={appointment.id}
                        />
                    ))}
                </div>
            )}

            {/* <button className="py-2 px-6 my-8 mx-auto text-lg font-semibold bg-gray-300 rounded-lg shadow-lg">
                <Trans id="user.finder.appointment.submit">
                    Weitere Termine laden
                </Trans>
            </button> */}
        </main>
    );
};
