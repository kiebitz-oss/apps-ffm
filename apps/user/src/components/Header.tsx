import { theme } from "@kiebitz-oss/config";
import { Trans } from "@lingui/macro";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logoUrl from "../../public/assets/ffm-logo.svg";
import { useUserApi } from "../pages/UserApiContext";
import { Hamburger } from "./Hamburger";
import { Link } from "./Link";
import NavContent from "./NavContent";
import { useI18n } from "./useI18n";

export interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const i18n = useI18n();
  const api = useUserApi();
  const locale = i18n.locale?.toLowerCase() || "de";

  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const isAuthed = api.isAuthenticated();

    console.log("Authenticated?", isAuthed);
  }, [api]);

  useEffect(() => {
    const handleRouteChange = () => {
      setShowMenu(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <header className="grid grid-flow-col justify-between items-center px-8 min-h-[5rem] md:px-12 md:min-h-[6rem]">
      <Link href="/">
        <img src={logoUrl.src} alt={theme.logoAlt} />
      </Link>

      <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
        <Hamburger />
      </button>

      <aside
        className={clsx(
          "flex fixed top-[80px] right-0 bottom-0 left-0 z-50 flex-col gap-10 p-8 w-full min-h-[100vh-80px] bg-white sm:hidden",
          {
            ["hidden"]: !showMenu,
          }
        )}
      >
        <NavContent />
      </aside>

      <nav className="hidden gap-12 justify-center sm:flex">
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
