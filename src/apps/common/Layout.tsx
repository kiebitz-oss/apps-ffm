import React, { useState } from 'react';
import Footer from './Footer';
import { Header } from './Header';

interface LayoutProps {
    nav?: React.FC<unknown> | undefined;
}

export const Layout: React.FC<LayoutProps> = ({ nav, children }) => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <Header onMobileNavClick={() => setNavOpen(!navOpen)} nav={nav} />

            {children}

            <div className={navOpen ? 'open' : 'closed'}>
                <Footer />
            </div>
        </>
    );
};
