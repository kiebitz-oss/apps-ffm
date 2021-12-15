// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { t, Trans } from '@lingui/macro';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Text, Title } from 'ui';
import { Questionaire } from './common/questionaire/Questionaire';
import { QuestionBox } from './common/questionaire/QuestionBox';

interface FormData {
    q1Value: boolean;
    q2Value: boolean;
    q3Value: boolean;
    q4Value: boolean;
}

const StartPage: React.FC = () => {
    const { watch, control, handleSubmit } = useForm();
    const navigate = useNavigate();

    const q1Value = watch('q1');
    const q2Value = watch('q2');
    const q3Value = watch('q3');
    const q4Value = watch('q4');

    const onSubmit: SubmitHandler<FormData> = (data) => {
        navigate('/user/finder');
    };

    return (
        <main>
            <Title variant="h1" as="h2" className="mb-6">
                <Trans id="user.welcome.title">Willkommen!</Trans>
            </Title>

            <Text className="mb-4 max-w-[48ch]">
                <Trans id="user.welcome.intro-1">
                    Sie sind jetzt nur noch wenige Klicks von Ihrem Termin
                    entfernt.
                </Trans>
            </Text>

            <Text className="mb-8 max-w-[48ch]">
                <Trans id="user.welcome.intro-2">
                    Wir speichern generell keine persönlichen Daten, aber haben
                    ein paar Fragen, damit Sie den richtigen Impfstoff erhalten.
                </Trans>
            </Text>

            <form
                className="flex flex-col w-full md:min-h-[400px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Questionaire>
                    <QuestionBox control={control} name="q1">
                        <Trans id="user.welcome.question1_value">
                            Handelt es sich um eine Booster-Impfung?
                        </Trans>
                    </QuestionBox>

                    {q1Value === true && (
                        <QuestionBox
                            control={control}
                            name="q2"
                            error={q2Value === false}
                            errorMessage={t({
                                id: 'user.welcome.question2_error',
                                message:
                                    'Es müssen 6 Monate seit Ihrem letzten Impftermin vergangen sein, bevor Sie sich boostern lassen können.',
                            })}
                        >
                            <Trans id="user.welcome.question2_value">
                                Liegt Ihre letzte Impfung mehr als 6 Monate
                                zurück?
                            </Trans>
                        </QuestionBox>
                    )}

                    {(q1Value === false || q2Value === true) && (
                        <QuestionBox control={control} name="q3">
                            <Trans id="user.welcome.question3_value">
                                Sind sie schwanger oder jünger als 30?
                            </Trans>
                        </QuestionBox>
                    )}

                    {(q1Value === false || q2Value === true) &&
                        q3Value === true && (
                            <QuestionBox
                                control={control}
                                name="q4"
                                error={q4Value === true}
                                errorMessage={t({
                                    id: 'user.welcome.question4_error',
                                    message:
                                        'Leider gibt es aktuell (noch) keine Termine für Kinderimpfungen über das Portal. Wir bemühen uns das Angebot schnellstmöglich zu erweitern und bitten bis dahin um Geduld.',
                                })}
                            >
                                <Trans id="user.welcome.question4_value">
                                    Sind Sie jünger als 12?
                                </Trans>
                            </QuestionBox>
                        )}
                </Questionaire>

                <Button
                    type="submit"
                    variant="primary"
                    // href="/user/finder"
                    disabled={!(q3Value === false || q4Value === false)}
                    className="mt-auto"
                >
                    <Trans id="user.welcome.button">Weiter zum Termin</Trans>
                </Button>
            </form>
        </main>
    );
};

export default StartPage;
