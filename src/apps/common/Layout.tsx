import { theme } from 'config/theme';
import React, { useState } from 'react';
import { Link } from 'ui';
import Footer from './Footer';

interface LayoutProps {
    nav?: React.ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ nav, children }) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <header>
                <h1>
                    <Link href="/">
                        <img src={theme.logo} alt={theme.logoAlt} />
                    </Link>
                </h1>

                <a
                    href="#sidenav-open"
                    id="sidenav-button"
                    className="hamburger"
                    title="Open Menu"
                    aria-label="Open Menu"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <svg
                        viewBox="0 0 50 40"
                        role="presentation"
                        focusable="false"
                        aria-label="trigram for heaven symbol"
                    >
                        <line x1="0" x2="100%" y1="10%" y2="10%" />
                        <line x1="0" x2="100%" y1="50%" y2="50%" />
                        <line x1="0" x2="100%" y1="90%" y2="90%" />
                    </svg>
                </a>

                {nav()}
            </header>

            {children}

            <div className={navOpen ? 'open' : 'closed'}>
                <Footer />
            </div>
        </>
    );
};
