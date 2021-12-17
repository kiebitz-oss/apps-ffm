import { Trans } from '@lingui/macro';
import React from 'react';
import { Link, Title } from 'ui';

const Footer: React.FC = () => {
    return (
        <footer className="flex items-stretch w-full">
            <section className="flex-[1] lg:flex-[2]">
                <Title as="h3" variant="h4">
                    <Trans id="common.footer.title.informations">
                        Informationen
                    </Trans>
                </Title>

                <ul>
                    <li>
                        <Link href="/">
                            <Trans id="common.footer.link.booking">
                                Impfterminen buchen
                            </Trans>
                        </Link>
                    </li>
                    <li>
                        <Link href="/user/faq">
                            <Trans id="common.footer.link.faq">
                                Fragen & Antworten
                            </Trans>
                        </Link>
                    </li>
                </ul>

                <Title as="h3" variant="h4">
                    <Trans id="common.footer.title.languages">Sprache</Trans>
                </Title>

                <ul>
                    <li>
                        <Link href="#">
                            <Trans id="common.footer.link.german">
                                Deutsch
                            </Trans>
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <Trans id="common.footer.link.english">
                                English
                            </Trans>
                        </Link>
                    </li>
                </ul>
            </section>

            <section className="flex-[1] lg:flex-[2]">
                <ul>
                    <li>
                        <Link href="/user/imprint">
                            <Trans id="common.footer.link.imprint">
                                Impressum
                            </Trans>
                        </Link>
                    </li>
                    <li>
                        <Link href="/user/privacy">
                            <Trans id="common.footer.link.privacy">
                                Datenschutz
                            </Trans>
                        </Link>
                    </li>

                    <li>
                        <Link href="https://github.com/kiebitz-oss" external>
                            Github
                        </Link>
                    </li>

                    <li>
                        <Link href="https://kiebitz.eu/" external>
                            <Trans id="common.footer.link.kiebitz">
                                Realisiert mit Kiebitz
                            </Trans>
                        </Link>
                    </li>
                </ul>
            </section>

            <section className="flex-[1] lg:flex-[4]">Logos</section>
        </footer>
    );
};

export default Footer;
