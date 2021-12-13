import { GeneratePdf16 } from '@carbon/icons-react';
import { Trans } from '@lingui/macro';
import { vaccines } from 'config/vaccines';
import { useUserApi } from 'hooks/useUserApi';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, Text, Title } from 'ui';
import { AppointmentCard } from '../common/AppointmentCard';
import { useFinderState } from './FinderStateProvider';

export const SuccessStep: React.FC = () => {
    const api = useUserApi();
    const { state } = useFinderState();
    const [secret, setSecret] = useState<string | null>(null);
    const navigate = useNavigate();
    const appointment = state.appointment!;

    useEffect(() => {
        if (!appointment || !appointment.provider) {
            navigate('/user/finder');
        } else {
            api.bookAppointment(appointment.id, appointment.provider.id)
                .then((secret) => {
                    setSecret(secret);
                })
                .catch((error) => {
                    // @TODO handle failure
                    console.error(error);
                });
        }
    }, [api, appointment, navigate]);

    const onCancel: MouseEventHandler<HTMLButtonElement> = () => {
        if (state.appointment && state.provider) {
            api.cancelAppointment(state.appointment.id, state.provider.id).then(
                (result) => {
                    console.log({ result });
                    navigate('/user');
                }
            );
        }
    };

    return (
        <main>
            <div className="xl:w-2/3">
                <Title variant="h1" as="h2">
                    <Trans id="user.finder.success.title">
                        Ihr Termin ist gebucht!
                    </Trans>
                </Title>

                <div>
                    <Text>
                        <Trans id="user.finder.success.intro">
                            <strong>Wichtig:</strong> Bitte notieren Sie sich
                            den untenstehenden Code und bringen ihn unbedingt
                            zur Impfung mit.
                        </Trans>
                    </Text>

                    <button
                        onClick={onCancel}
                        className="inline-flex gap-2 items-center py-4 px-8 mb-12 font-semibold text-red-700 no-underline bg-red-100 rounded-lg"
                    >
                        <Trans id="user.finder.cancel-appointment.button">
                            Um die Terminbuchung abzusagen, bitte hier klicken
                        </Trans>
                    </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-16">
                    <div>
                        <Title variant="book" as="h3">
                            <Trans id="user.finder.success.appointment-title">
                                Ihr Termin
                            </Trans>
                        </Title>

                        <AppointmentCard appointment={appointment} />
                    </div>

                    <div>
                        <Title variant="book" as="h3">
                            <Trans id="user.finder.success.appointment-code">
                                Ihr Buchungscode
                            </Trans>
                        </Title>

                        <div className="flex justify-center items-center p-4 text-2xl font-bold text-white bg-black rounded-lg">
                            {secret ? secret : 'Buchung läuft...'}
                        </div>
                    </div>

                    <div>
                        <Text>
                            Das müssen Sie zur Impfung gegen COVID-19
                            mitbringen:
                        </Text>

                        <ul className="flex flex-col gap-8 mb-8">
                            <li>
                                <strong>amtliches Ausweisdokument</strong>
                                <br />
                                <i>(Personalausweis, Reisepass)</i>
                            </li>
                            <li>
                                <strong>Impfpass</strong>
                                <br />
                                <i>
                                    (wenn nicht vorhanden, erhalten Sie eine
                                    Ersatzbescheinigung.)
                                </i>
                            </li>
                            <li>
                                <strong>FFP2-Maske</strong>
                                <br />
                                <i>(zur Einhaltung der Hygienemaßnahmen)</i>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <Text variant="intro2">
                            Vor dem Impftermin und Ihrem medizinischen
                            Aufklärungsgespräch können Sie sich das
                            Aufklärungsmerkblatt zum Impfstoff und die
                            Einwilligungserklärung zur Impfung im nachfolgend
                            als PDF-Datei herunterladen und ausdrucken. Dort
                            erhalten Sie ebenfalls wichtige Informationen zu
                            Ihrer Impfung und dem Impfstoff gegen das
                            Coronavirus. Mit folgenden Schritten können Sie sich
                            auf Ihren Impftermin vorbereiten:
                        </Text>

                        <div>
                            <Link
                                href={vaccines.de[appointment.vaccine].infosUrl}
                                external
                                className="inline-flex gap-2 items-center py-2 px-4 mb-2 font-semibold text-blue-700 no-underline bg-blue-100 rounded-lg"
                            >
                                <GeneratePdf16 />
                                Aufklärungsmerkblatt
                            </Link>
                            <br />
                            <Text>
                                zum Impfstoff lesen und gegebenenfalls Fragen
                                notieren
                            </Text>
                        </div>

                        <div>
                            <Link
                                href={
                                    vaccines.de[appointment.vaccine]
                                        .anamnesisUrl
                                }
                                external
                                className="inline-flex gap-2 items-center py-2 px-4 mb-2 font-semibold text-blue-700 no-underline bg-blue-100 rounded-lg"
                            >
                                <GeneratePdf16 />
                                Einwilligungserklärung lesen
                            </Link>
                            <br />
                            <Text>
                                An- und Rückfahrt planen und organisieren
                            </Text>
                            <Text>
                                Zeit für <strong>Nachbeobachtung</strong>{' '}
                                einplanen.
                                <br />
                                <i>
                                    (ca. 15 Minuten, bei bestimmten
                                    Vorerkrankungen gegebenenfalls auch etwas
                                    länger)
                                </i>
                            </Text>
                            <Text>
                                Gedanken zur eigenen{' '}
                                <strong>Krankheitsgeschichte</strong>{' '}
                                <i>
                                    (zum Beispiel Allergien, Ohnmachtsanfälle)
                                </i>{' '}
                                machen, um diese der Ärztin oder dem Arzt bei
                                der Impfung mitteilen und mögliche Risiken der
                                Impfung abwägen zu können.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
