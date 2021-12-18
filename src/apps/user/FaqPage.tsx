import { Trans } from '@lingui/macro';
import React from 'react';
import { Title } from 'ui';
import { FaqSection } from './common/faq/FaqSection';

export const FaqPage: React.FC = () => {
    return (
        <main id="faq">
            <article className="flex flex-col gap-14 md:gap-14">
                <Title as="h2" variant="h1">
                    <Trans id="user.faq.title">Fragen & Antworten</Trans>
                </Title>

                <FaqSection>
                    <Trans id="user.faq.section1.title">
                        Fragen zum Impfzentrum und Ablauf der Impfung
                    </Trans>
                </FaqSection>

                <FaqSection>
                    <Trans id="user.faq.section2.title">
                        FRAGEN ZUM IMPFSTOFF, ZUR VERTRÄGLICHKEIT UND ZUR
                        VERABREICHUNG
                    </Trans>
                </FaqSection>

                <FaqSection>
                    <Trans id="user.faq.section3.title">
                        FRAGEN ZU ORGANISATION UND ZUSTÄNDIGKEITEN
                    </Trans>
                </FaqSection>

                <FaqSection>
                    <Trans id="user.faq.section4.title">
                        Fragen zu buchung und funktionen dieser plattform
                    </Trans>
                </FaqSection>
            </article>
        </main>
    );
};
