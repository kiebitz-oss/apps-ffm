import { Trans } from '@lingui/macro';
import { BackLink } from 'apps/common/BackLink';
import { useUserApi } from 'hooks/useUserApi';
import React from 'react';
import { Link, Text, Title } from 'ui';
import { useFinderState } from './FinderStateProvider';

export const VerifyStep: React.FC = () => {
    const api = useUserApi();
    const { state } = useFinderState();

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

    return (
        <main>
            <div className="xl:w-2/3">
                <BackLink href="/user/finder/slot">
                    <Trans id="user.finder.verify.back-link">
                        zurück zum Terminauswahl
                    </Trans>
                </BackLink>

                <Title variant="h1" as="h2">
                    <Trans id="user.finder.verify.title">Übersicht</Trans>
                </Title>

                <Text>
                    <Trans id="user.finder.verify.intro">
                        Hier ist Ihr gewählter Termin. Prüfen Sie nochmal, ob
                        alles stimmt. Anschließend können Sie den Termin
                        endgültig buchen.
                    </Trans>
                </Text>

                <div className="flex flex-col md:flex-row md:gap-12">
                    <div className="md:w-1/2">
                        <Title variant="book" as="h3">
                            <Trans id="user.finder.verify.appointment.subtitle">
                                Ihr Termin
                            </Trans>
                        </Title>

                        <div className="p-4 mb-8 w-full font-semibold rounded-lg border-2 border-black md:px-16">
                            <address className="mb-2 text-center">
                                <Title variant="h3">Latin Palace Changó</Title>
                                <br /> Münchener Str. 57,
                                <br /> 60327 Frankfurt am Main
                            </address>

                            <time className="block text-lg text-center">
                                21.12.21, 13:03 Uhr
                            </time>
                        </div>
                    </div>

                    <Text className="italic md:mt-6 md:w-1/2">
                        <Trans id="user.finder.verify.appointment.description">
                            Die einzigartigste und größte Latin Diskothek in
                            Hessen, die ausschließlich dem lateinamerikanischen
                            Lebensgefühl gewidmet ist.
                        </Trans>
                    </Text>
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
            </div>
        </main>
    );
};
