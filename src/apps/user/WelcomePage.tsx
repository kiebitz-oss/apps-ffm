// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Text, Title } from 'ui';
import { Questionaire } from './common/questionaire/Questionaire';
import { QuestionBox } from './common/questionaire/QuestionBox';

interface FormData {
    q1Value: boolean;
    q2Value: boolean;
    q3Value: boolean;
}

const StartPage: React.FC = () => {
    const { watch, control, handleSubmit } = useForm();

    const q1Value = watch('numberOfVaccination');
    const q2Value = watch('under30');
    const q3Value = watch('under12');

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
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
                        <QuestionBox control={control} name="q2">
                            <Trans id="user.welcome.question2_value">
                                Sind sie schwanger oder jünger als 30?
                            </Trans>
                        </QuestionBox>
                    )}

                    {q1Value === true && q2Value === true && (
                        <QuestionBox control={control} name="q3">
                            Sind Sie jünger als 12?
                        </QuestionBox>
                    )}
                </Questionaire>

                <Button
                    type="submit"
                    variant="primary"
                    // href="/user/finder"
                    disabled={q3Value !== true}
                    className="mt-auto"
                >
                    <Trans id="user.welcome.button">Weiter zum Termin</Trans>
                </Button>
            </form>
        </main>
    );
};

export default StartPage;
