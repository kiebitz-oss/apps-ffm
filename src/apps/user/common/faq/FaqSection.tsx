import { t, Trans } from '@lingui/macro';
import React from 'react';
import { Title } from 'ui';
import { FaqQuestion } from './FaqQuestion';

export interface FaqSectionProps {}

export const FaqSection: React.FC = ({ children, ...props }) => {
    return (
        <section className="flex flex-col" {...props}>
            <Title
                as="h3"
                variant="section"
                className="mb-5 text-lg font-semibold tracking-wider uppercase"
            >
                {children}
            </Title>

            <div className="flex flex-col px-8 md:gap-10 md:px-0 md:ml-6">
                <FaqQuestion
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
                </FaqQuestion>

                <FaqQuestion
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
                </FaqQuestion>

                <FaqQuestion
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
                </FaqQuestion>

                <FaqQuestion
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
                </FaqQuestion>

                <FaqQuestion
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
                </FaqQuestion>

                <FaqQuestion
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
                </FaqQuestion>
            </div>
        </section>
    );
};
