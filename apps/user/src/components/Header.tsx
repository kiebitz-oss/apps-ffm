import { theme } from "@kiebitz-oss/config";
import { Link } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { useEffect } from "react";
import logoUrl from "../../public/assets/ffm-logo.svg";
import { useUserApi } from "../pages/UserApiContext";
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
        <img src={logoUrl.src} alt={theme.logoAlt} />
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
          <Trans id="header.nav.link.book_vaccination">Impftermin buchen</Trans>
        </Link>

        <Link href="/faq">
          <Trans id="header.nav.link.faq">Fragen & Antworten</Trans>
        </Link>

        <div>
          <Link
            data-test={"nav.locale.de"}
            locale="de"
            href={router.asPath}
            className={locale.startsWith("de") ? "link font-bold" : "link"}
          >
            <Trans id="header.nav.link.lang_german_short">DE</Trans>
          </Link>{" "}
          |{" "}
          <Link
            data-test={"nav.locale.en"}
            locale="en"
            href={router.asPath}
            className={locale.startsWith("en") ? "link font-bold" : "link"}
          >
            <Trans id="header.nav.link.lang_english_short">EN</Trans>
          </Link>
        </div>
      </nav>
    </header>
  );
};
