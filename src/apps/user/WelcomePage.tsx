// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { t, Trans } from '@lingui/macro';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button, Error, Text, Title } from 'ui';
import { QuestionBox } from './common/questionaire/QuestionBox';

interface FormData {
    q1Value: boolean;
    q2Value: boolean;
    q3Value: boolean;
    q4Value: boolean;
}

const StartPage: React.FC = () => {
    const { watch, control, handleSubmit } = useForm();
    const [error, setError] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);
    const navigate = useNavigate();

    const q1Value = watch('q1');
    const q2Value = watch('q2');
    const q3Value = watch('q3');
    const q4Value = watch('q4');

    useEffect(() => {
        setValid(q3Value === false || q4Value === false || false);
    }, [q3Value, q4Value]);

    const onSubmit: SubmitHandler<FormData> = () => {
        if (valid) {
            navigate('/user/finder');
        } else {
            setError(true);
        }
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

            <form className="questionaire" onSubmit={handleSubmit(onSubmit)}>
                <div className="questions">
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
                </div>

                {error && (
                    <Error>
                        <Trans id="user.welcome.form_error">
                            Bitte beantworten Sie alle Fragen, denn sonst können
                            wir keine Termine für Sie heraussuchen. Alle Ihre
                            persönlichen Daten werden nur auf Ihrem Endgerät
                            gespeichert und nicht an einen Server übermittelt
                            oder weitergegeben.
                        </Trans>
                    </Error>
                )}

                <Button type="submit" variant={valid ? 'primary' : 'invalid'}>
                    <Trans id="user.welcome.button">Weiter zum Termin</Trans>
                </Button>
            </form>
        </main>
    );
};

export default StartPage;
