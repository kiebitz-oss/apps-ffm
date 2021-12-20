import { Link } from "@kiebitz-oss/ui";
import { useRouter } from "next/router";
import { useI18n } from "./useI18n";

export interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const router = useRouter();
  const i18n = useI18n();
  const locale = i18n.locale?.toLowerCase() || "de";

  return (
    <nav className="hidden gap-12 sm:flex md:pt-8">
      <Link href="/faq">Fragen & Antworten</Link>

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
  );
};
