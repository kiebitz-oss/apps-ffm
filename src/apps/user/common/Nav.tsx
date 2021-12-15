import { useI18n } from 'hooks';
import React from 'react';
import { Link } from 'ui';

export const Nav: React.FC = () => {
    const i18n = useI18n();
    const locale = i18n.locale.toLowerCase();

    return (
        <nav>
            <Link href="/user/faq">Fragen & Antworten</Link>

            <div>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        i18n.activate('de');
                    }}
                    className={
                        locale.startsWith('de') ? 'font-bold' : undefined
                    }
                >
                    DE
                </a>{' '}
                |{' '}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        i18n.activate('en');
                    }}
                    className={
                        locale.startsWith('en') ? 'font-bold' : undefined
                    }
                >
                    EN
                </a>
            </div>
        </nav>
    );
};
