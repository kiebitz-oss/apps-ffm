import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ProviderData } from 'types';
import { Message, Text } from 'ui';

interface ProviderDataProps {
    provider: ProviderData;
    changeHref?: string;
    verified?: boolean;
}

export const ProviderDataSummary: React.FC<ProviderDataProps> = ({
    provider,
    verified = false,
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!provider) {
            navigate('/provider/onboarding');
        }
    }, [provider, navigate]);

    return (
        <>
            {!verified && (
                <Text>
                    <Trans id="provider-provider.not-verified-yet">
                        Ihre Daten wurden noch nicht verifiziert. Bitte haben
                        Sie Verständnis, dass die Verifizierung bis zu 48h
                        dauern kann.
                    </Trans>
                </Text>
            )}

            <Message
                variant="warning"
                className="py-3 my-6 text-xl font-semibold text-center"
            >
                <Trans id="verify.text">
                    Bitte überprüfen Sie Ihre Daten, bevor Sie den Vorgang
                    abschließen.
                </Trans>
            </Message>

            <div
                className={clsx('provider-data-summary', {
                    ['verified']: verified,
                })}
            >
                <dl>
                    <dt>
                        <Trans id="provider-provider.name">
                            Vollständiger Name
                        </Trans>
                    </dt>
                    <dd>{provider.name}</dd>

                    <dt>
                        <Trans id="provider-provider.street">
                            Straße & Hausnummer
                        </Trans>
                    </dt>
                    <dd>{provider.street}</dd>

                    <dt>
                        <Trans id="provider-provider.zip-code">
                            Postleitzahl
                        </Trans>
                    </dt>
                    <dd>
                        {provider.zipCode}
                    </dd>
                    <dt>
                    <Trans id="provider-provider.city">Ort</Trans>
                    </dt>
                    <dd>
                        {provider.city}
                    </dd>
                    <dt>
                        <Trans id="provider-provider.website">Webseite</Trans>
                    </dt>
                    <dd>{provider.website || (
                            <Trans id="provider-provider.not-given">
                                (keine Angabe)
                            </Trans>
                        )}}</dd>

                    <dt>
                        <Trans id="provider-provider.description">
                            Informationen für Impfwillige
                        </Trans>
                    </dt>
                    <dd>
                        {provider.description || (
                            <Trans id="provider-provider.not-given">
                                (keine Angabe)
                            </Trans>
                        )}
                    </dd>

                    <dt>
                        <Trans id="provider-provider.phone">
                            Telefonnummer
                        </Trans>
                    </dt>
                    <dd>
                        {provider.phone || (
                            <Trans id="provider-provider.not-given">
                                (keine Angabe)
                            </Trans>
                        )}
                    </dd>

                    <dt>
                        <Trans id="provider-provider.email" />
                    </dt>
                    <dd>
                        {provider.email || (
                            <Trans id="provider-provider.not-given">
                                (keine Angabe)
                            </Trans>
                        )}
                    </dd>

                    <dt>
                        <Trans id="provider-provider.access-code.label">
                            Zugangscode (falls vorhanden)
                        </Trans>
                    </dt>
                    <dd>
                        {provider.code || (
                            <Trans id="provider-provider.not-given">
                                (keine Angabe)
                            </Trans>
                        )}
                    </dd>

                    <dt>
                        <Trans id="provider-provider.accessible">
                            Barrierefreier Zugang zur Praxis/zum Impfzentrum
                        </Trans>
                        ?
                    </dt>
                    <dd>
                        {provider.accessible ? (
                            <Trans id="yes">Ja</Trans>
                        ) : (
                            <Trans id="no">Nein</Trans>
                        )}
                    </dd>
                </dl>
            </div>
        </>
    );
};
