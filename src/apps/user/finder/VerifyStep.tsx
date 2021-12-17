import { Trans } from '@lingui/macro';
import { BackLink } from 'apps/common/BackLink';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link, Text, Title } from 'ui';
import { AppointmentCard } from '../common/AppointmentCard';
import { useUserApi } from '../common/UserApiContext';
import { useFinderState } from './FinderStateProvider';

export const VerifyStep: React.FC = () => {
    const api = useUserApi();
    const { state } = useFinderState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state.appointment) {
            navigate('/user/finder');
        }
    }, [state.appointment, navigate]);

    const onBooking = () => {
        if (state.appointment && state.provider) {
            api.bookAppointment(state.appointment.id, state.provider.id).then(
                (result) => {
                    console.log({ state, result });
                }
            );
        } else {
            // @TODO handle missing selections
        }
    };

    // safeguard
    if (!state.appointment) {
        return null;
    }

    return (
        <main id="finder-verify">
            <BackLink href="/user/finder">
                <Trans id="user.finder.verify.back-link">
                    zurück zum Terminauswahl
                </Trans>
            </BackLink>

            <Title variant="h1" as="h2" className="mb-5">
                <Trans id="user.finder.verify.title">Übersicht</Trans>
            </Title>

            <Text variant="text2" className="mb-10">
                <Trans id="user.finder.verify.intro">
                    Hier ist Ihr gewählter Termin. Prüfen Sie bitte genau, ob
                    alles stimmt. Anschließend können Sie den Termin endgültig
                    buchen.
                </Trans>
            </Text>

            <div className="your-appointment">
                <div className="md:w-1/2">
                    <Title variant="book" as="h3">
                        <Trans id="user.finder.verify.appointment.subtitle">
                            Ihr Termin
                        </Trans>
                    </Title>

                    <AppointmentCard appointment={state.appointment} border />
                </div>

                {state.appointment?.provider?.description && (
                    <Text className="provider-description">
                        <Trans id="user.finder.verify.appointment.description">
                            {state.appointment.provider.description}
                        </Trans>
                    </Text>
                )}
            </div>

            <Link
                type="button"
                variant="primary"
                href="/user/finder/success"
                className="mt-auto sm:mt-0"
                onClick={onBooking}
            >
                <Trans id="user.finder.verify.submit">
                    Termin jetzt buchen
                </Trans>
            </Link>
        </main>
    );
};
