// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Trans } from '@lingui/macro';
import { useMediatorApi } from 'hooks';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Message, Section, Title } from 'ui';

const WelcomePage: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const api = useMediatorApi();
    const navigate = useNavigate();

    useEffect(() => {
        api.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                navigate('/mediator/providers');
            }
        });
    }, [api, authenticated, navigate]);

    const uploadFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                if (e.target?.result && typeof e.target.result === 'string') {
                    const keyPairs = JSON.parse(e.target.result);

                    if (
                        keyPairs.signing === undefined ||
                        keyPairs.encryption === undefined ||
                        keyPairs.provider === undefined
                    ) {
                        setInvalidFile(true);
                    } else {
                        api.authenticate(keyPairs).then((isAuthenticated) => {
                            setAuthenticated(isAuthenticated);
                        });
                    }
                }
            };

            reader.readAsBinaryString(file);
        }
    };

    return (
        <main>
            <Section className="mt-10 w-full sm:mt-0">
                <Title className="text-2xl font-bold leading-relaxed text-gray-900">
                    <Trans id="mediator.welcome.title">
                        Als Mediator anmelden
                    </Trans>
                </Title>

                <div>
                    <Title>
                        <Trans id="mediator.welcome.upload-key-pairs">
                            Geheime Schlüssel laden
                        </Trans>
                    </Title>

                    {invalidFile && (
                        <Message variant="secondary">
                            <Trans id="mediator.welcome.upload-key-pairs.invalid-file">
                                Die von Ihnen gewählte Datei ist ungültig.
                            </Trans>
                        </Message>
                    )}

                    {!invalidFile && (
                        <Trans id="mediator.welcome.upload-key-pairs.notice">
                            Bitte laden Sie die Datei mit Ihren geheimen
                            Vermittlerschlüsseln.
                        </Trans>
                    )}

                    <form>
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer button primary md"
                        >
                            <Trans id="mediator.welcome.upload-key-pairs.input">
                                Datei auswählen
                            </Trans>

                            <input
                                id="file-upload"
                                className="absolute inset-0 w-auto opacity-0 -z-10"
                                type="file"
                                onChange={uploadFile}
                            />
                        </label>
                    </form>
                </div>
            </Section>
        </main>
    );
};

export default WelcomePage;
