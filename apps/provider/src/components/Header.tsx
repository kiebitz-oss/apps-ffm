import { theme } from "@kiebitz-oss/config";
import logoUrl from "../../public/assets/ffm-logo.svg";
import { Link } from "./Link";
import { Nav } from "./Nav";

export interface HeaderProps extends React.ComponentProps<"header"> {
  onMobileNavClick: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Header: React.FC<HeaderProps> = ({ onMobileNavClick }) => {
  return (
    <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
      <h1>
        <Link href="/">
          <a>
            <img src={logoUrl.src} alt={theme.logoAlt} />
          </a>
        </Link>
      </h1>
      {/* 
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
      </a> */}

      <Nav />
    </header>
  );
};
