// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import React from 'react';
import { Link, Text, Title } from 'ui';
import { CheckboxField } from 'ui/CheckboxField';

const StartPage: React.FC = () => {
    return (
        <main>
            <Title variant="h1" as="h2">
                <Trans id="user.welcome.title">Willkommen!</Trans>
            </Title>

            <Text>
                <Trans id="user.welcome.intro">
                    Sie sind jetzt nur noch wenige Klicks von Ihrem Termin
                    entfernt.
                    <br />
                    Wir speichern generell keine persönlichen Daten, aber haben
                    ein paar Fragen, damit Sie den richtigen Impfstoff erhalten.
                </Trans>
            </Text>

            <form>
                <CheckboxField
                    name="over12"
                    label="Ich bin älter als 12 Jahre."
                    className="my-4"
                />

                <CheckboxField
                    name="over30"
                    label="Ich bin älter als 30 Jahre."
                    className="my-4"
                />

                <CheckboxField
                    name="booster"
                    label="Im Falle einer Boosterimpfung: Meine letzte Impfung liegt über 6 Monate zurück."
                    className="my-4"
                />

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
