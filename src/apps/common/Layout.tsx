import { theme } from 'config/theme';
import React from 'react';
import { Link } from 'ui';
import Footer from './Footer';

interface LayoutProps {
    nav?: React.ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ nav, children }) => {
    return (
        <>
            <header>
                <h1>
                    <Link href="/">
                        <img src={theme.logo} alt={theme.logoAlt} />
                    </Link>
                </h1>

                {nav()}
            </header>

            {children}

            <Footer />
        </>
    );
};
