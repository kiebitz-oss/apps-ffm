import { useI18n } from 'apps/common/useI18n';
import React from 'react';
import { Link } from 'ui';

export interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
    const i18n = useI18n();
    const locale = i18n.locale.toLowerCase();

    return (
        <nav className="hidden gap-12 sm:flex md:pt-8">
            <Link href="/user/faq">Fragen & Antworten</Link>

            <div>
                <a
                    data-test={'nav.locale.de'}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        i18n.activate('de');
                    }}
                    className={
                        locale.startsWith('de') ? 'link font-bold' : 'link'
                    }
                >
                    DE
                </a>{' '}
                |{' '}
                <a
                    data-test={'nav.locale.en'}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        i18n.activate('en');
                    }}
                    className={
                        locale.startsWith('en') ? 'link font-bold' : 'link'
                    }
                >
                    EN
                </a>
            </div>
        </nav>
    );
};
