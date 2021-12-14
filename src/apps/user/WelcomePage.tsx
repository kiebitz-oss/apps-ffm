// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import React from 'react';
import { Link, Text, Title } from 'ui';
import { Questionaire } from './common/questionaire/Questionaire';
import { QuestionBox } from './common/questionaire/QuestionBox';

const StartPage: React.FC = () => {
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

            <form className="w-full">
                <Questionaire>
                    <QuestionBox id="booster">
                        Handelt es sich um eine Booster-Impfung?
                    </QuestionBox>

                    <QuestionBox id="under30">
                        Sind sie schwanger oder jünger als 30?
                    </QuestionBox>

                    <QuestionBox id="under112">
                        Sind Sie jünger als 12?
                    </QuestionBox>
                </Questionaire>

                <Link
                    type="button"
                    variant="primary"
                    href="/user/finder"
                    className="mt-auto"
                >
                    <Trans id="user.welcome.button">Weiter zum Termin</Trans>
                </Link>
            </form>
        </main>
    );
};

export default StartPage;
