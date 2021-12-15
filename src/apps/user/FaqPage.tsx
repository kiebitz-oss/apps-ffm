import { t, Trans } from '@lingui/macro';
import React from 'react';
import { Title } from 'ui';
import { Question } from './common/faq/Question';

export const FaqPage: React.FC = () => {
    return (
        <main id="faq">
            <section>
                <Title as="h2" variant="h1">
                    <Trans id="user.faq.title">Fragen & Antworten</Trans>
                </Title>

                <div className="questions">
                    <Question
                        question={t({
                            id: 'user.faq.question.title.1',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.1">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>

                    <Question
                        question={t({
                            id: 'user.faq.question.title.2',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.2">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>

                    <Question
                        question={t({
                            id: 'user.faq.question.title.3',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.3">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>

                    <Question
                        question={t({
                            id: 'user.faq.question.title.4',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.4">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>

                    <Question
                        question={t({
                            id: 'user.faq.question.title.5',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.5">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>

                    <Question
                        question={t({
                            id: 'user.faq.question.title.6',
                            message:
                                'Warum ist das Zertifikat für meine Auffrischungsimpfung/Booster-Impfung ungültig bzw. nicht sofort gültig?',
                        })}
                    >
                        <Trans id="user.faq.question.answer.6">
                            In der CovPass-App können auch Zertifikate für
                            Auffrischungsimpfungen/Booster-Impfungen eingescannt
                            werden. Nach der Auffrischungsimpfung haben Sie
                            direkt einen Impfschutz. In manchen Fällen wird dies
                            in der App jedoch nicht angezeigt.
                        </Trans>
                    </Question>
                </div>
            </section>
        </main>
    );
};
