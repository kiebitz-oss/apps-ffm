import { theme } from 'config/theme';
import React from 'react';
import { Link } from 'ui';

interface LayoutProps {
    nav?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ nav, children }) => {
    const Footer = theme.footer;
    const Nav = nav;

    return (
        <>
            <header>
                <h1>
                    <Link href="/">
                        <img src={theme.logo} alt={theme.logoAlt} />
                    </Link>
                </h1>

                <Nav />
            </header>

            {children}

            <Footer />
        </>
    );
};
