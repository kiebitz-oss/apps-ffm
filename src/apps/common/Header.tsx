import { theme } from 'config/theme';
import React from 'react';
import { Link } from 'ui';

export interface HeaderProps extends React.ComponentProps<'header'> {
    onMobileNavClick: React.MouseEventHandler<HTMLAnchorElement>;
    nav?: React.FC<unknown> | undefined;
}

export const Header: React.FC<HeaderProps> = ({
    onMobileNavClick,
    nav: Nav,
}) => {
    return (
        <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
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
                onClick={onMobileNavClick}
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

            {Nav && <Nav />}
        </header>
    );
};
