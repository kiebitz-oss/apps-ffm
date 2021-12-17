import { t, Trans } from '@lingui/macro';
import React from 'react';
import { Title } from 'ui';
import { Question } from './common/faq/Question';

const FaqSection: React.FC = ({ children }) => {
    return (
        <section className="faq-section">
            <Title as="h3" variant="section">
                {children}
            </Title>

            <div className="questions">
                <Question
                    question={t({
                        id: 'user.faq.question.title.1',
                        message:
                            'Für wen wird die Impfung gegen COVID-19 empfohlen?',
                    })}
                >
                    <Trans id="user.faq.question.answer.1">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>

                <Question
                    question={t({
                        id: 'user.faq.question.title.2',
                        message:
                            'Wie erreiche ich das Impfzentrum Frankfurt und wie kann ich mich vor Ort zurechtfinden?',
                    })}
                >
                    <Trans id="user.faq.question.answer.2">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>

                <Question
                    question={t({
                        id: 'user.faq.question.title.3',
                        message:
                            'Wie erreiche ich das Impfzentrum Frankfurt und wie kann ich mich vor Ort zurechtfinden?',
                    })}
                >
                    <Trans id="user.faq.question.answer.3">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>

                <Question
                    question={t({
                        id: 'user.faq.question.title.4',
                        message: 'Was muss ich zur Impfung mitbringen?',
                    })}
                >
                    <Trans id="user.faq.question.answer.4">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>

                <Question
                    question={t({
                        id: 'user.faq.question.title.5',
                        message:
                            'Wie viel Zeit sollte ich für die Impfung einplanen?',
                    })}
                >
                    <Trans id="user.faq.question.answer.5">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>

                <Question
                    question={t({
                        id: 'user.faq.question.title.6',
                        message:
                            'Was mache ich, wenn ich meinen Impfausweis verloren habe?',
                    })}
                >
                    <Trans id="user.faq.question.answer.6">
                        In der CovPass-App können auch Zertifikate für
                        Auffrischungsimpfungen/Booster-Impfungen eingescannt
                        werden. Nach der Auffrischungsimpfung haben Sie direkt
                        einen Impfschutz. In manchen Fällen wird dies in der App
                        jedoch nicht angezeigt.
                    </Trans>
                </Question>
            </div>
        </section>
    );
};

export const FaqPage: React.FC = () => {
    return (
        <main id="faq">
            <article className="faq-sections">
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
