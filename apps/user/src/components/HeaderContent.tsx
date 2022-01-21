import { Link, NavLink } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";

export interface HeaderContentProps {
  locale?: string;
  setLocale: (locale: string) => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  locale = "de",
  setLocale,
}) => {
  const router = useRouter();

  return (
    <nav className="hidden gap-12 justify-center sm:flex">
      <NavLink href="/" exact>
        <Trans id="header.nav.link.book_vaccination">Impftermin buchen</Trans>
      </NavLink>

      <NavLink href="/faq">
        <Trans id="header.nav.link.faq">Fragen & Antworten</Trans>
      </NavLink>

      <div>
        <Link
          data-test={"nav.locale.de"}
          locale="de"
          href={router.asPath}
          onClick={(event) => {
            event.preventDefault();
            setLocale("de");
          }}
          className={locale.startsWith("de") ? "link font-bold" : "link"}
        >
          <Trans id="header.nav.link.lang_german_short">DE</Trans>
        </Link>{" "}
        |{" "}
        <Link
          data-test={"nav.locale.en"}
          locale="en"
          href={router.asPath}
          onClick={(event) => {
            event.preventDefault();
            setLocale("en");
          }}
          className={locale.startsWith("en") ? "link font-bold" : "link"}
        >
          <Trans id="header.nav.link.lang_english_short">EN</Trans>
        </Link>
      </div>
    </nav>
  );
};
