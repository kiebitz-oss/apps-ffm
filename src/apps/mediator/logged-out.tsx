// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import React from 'react';
import { Link, Message, Title } from 'ui';

const LoggedOutPage: React.FC = () => {
    return (
        <main className="content">
            <Title>
                <Trans id="mediator.logged-out.title"></Trans>
            </Title>

            <Message variant="success">
                <Trans id="mediator.logged-out.notice">
                    Sie wurden erfolgreich abgemeldet. Sie können sich jederzeit
                    mit Ihrer Schlüsseldatei wieder anmelden.
                </Trans>
            </Message>

            <Link href="/mediator" type="button" variant="primary">
                <Trans id="mediator.logged-out.log-in-again">Einloggen</Trans>
            </Link>
        </main>
    );
};

export default LoggedOutPage;
