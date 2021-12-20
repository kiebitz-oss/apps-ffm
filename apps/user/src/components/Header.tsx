import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { useUserApi } from "pages/UserApiContext";
import { useEffect } from "react";
import { theme } from "../config/theme";
import { Link } from "./Link";
import { useI18n } from "./useI18n";

export interface HeaderProps extends React.ComponentProps<"header"> {
  onMobileNavClick: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Header: React.FC<HeaderProps> = ({ onMobileNavClick }) => {
  const router = useRouter();
  const i18n = useI18n();
  const api = useUserApi();
  const locale = i18n.locale?.toLowerCase() || "de";

  useEffect(() => {
    api.isAuthenticated().then((result) => {
      console.log("Authenticated?", result);
    });
  }, [api]);

  return (
    <header className="grid grid-flow-col justify-between items-center px-8 min-h-[86px] md:px-12 md:min-h-[100px]">
      <Link href="/">
        <img src={theme.logo} alt={theme.logoAlt} />
      </Link>

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

      <nav className="hidden gap-12 sm:flex md:pt-8">
        <Link href="/">
          <Trans>Impftermin buchen</Trans>
        </Link>

        <Link href="/faq">
          <Trans>Fragen & Antworten</Trans>
        </Link>

        <div>
          <Link
            data-test={"nav.locale.de"}
            locale="de"
            href={router.asPath}
            className={locale.startsWith("de") ? "link font-bold" : "link"}
          >
            DE
          </Link>{" "}
          |{" "}
          <Link
            data-test={"nav.locale.en"}
            locale="en"
            href={router.asPath}
            className={locale.startsWith("en") ? "link font-bold" : "link"}
          >
            EN
          </Link>
        </div>
      </nav>
    </header>
  );
};
