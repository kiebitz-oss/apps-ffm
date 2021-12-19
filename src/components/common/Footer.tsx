import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import { Link, Title } from "ui";
import gaFfmUrl from "../../config/theme/ffm/ga-ffm-logo.svg";
import stadtFfmUrl from "../../config/theme/ffm/stadt-ffm-logo.svg";
import { useI18n } from "./useI18n";

const Footer: React.FC = () => {
  const router = useRouter();
  const i18n = useI18n();
  const locale = i18n.locale?.toLowerCase() || "de";

  return (
    <footer className="flex items-stretch w-full">
      <section className="flex-[1] lg:flex-[2]">
        <Title as="h3" variant="h4">
          <Trans id="common.footer.title.informations">Informationen</Trans>
        </Title>

        <ul>
          <li>
            <Link href="/">
              <Trans id="common.footer.link.booking">Impfterminen buchen</Trans>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <Trans id="common.footer.link.faq">Fragen & Antworten</Trans>
            </Link>
          </li>
        </ul>

        <Title as="h3" variant="h4">
          <Trans id="common.footer.title.languages">Sprache</Trans>
        </Title>

        <ul>
          <li>
            <Link
              data-test={"nav.locale.de"}
              locale="de"
              href={router.asPath}
              className={
                locale.startsWith("de") ? "link font-semibold" : "link"
              }
            >
              <Trans id="common.footer.link.german">Deutsch</Trans>
            </Link>
          </li>
          <li>
            <Link
              data-test={"nav.locale.en"}
              locale="en"
              href={router.asPath}
              className={
                locale.startsWith("en") ? "link font-semibold" : "link"
              }
            >
              <Trans id="common.footer.link.english">English</Trans>
            </Link>
          </li>
        </ul>
      </section>

      <section className="flex-[1] lg:flex-[2]">
        <ul>
          <li>
            <Link href="/imprint">
              <Trans id="common.footer.link.imprint">Impressum</Trans>
            </Link>
          </li>
          <li>
            <Link href="/privacy">
              <Trans id="common.footer.link.privacy">Datenschutz</Trans>
            </Link>
          </li>

          <li>
            <Link href="https://github.com/kiebitz-oss" external>
              Github
            </Link>
          </li>

          <li>
            <Link href="https://kiebitz.eu/" external>
              <Trans id="common.footer.link.kiebitz">
                Realisiert mit Kiebitz
              </Trans>
            </Link>
          </li>
        </ul>
      </section>

      <section className="flex flex-col flex-[1] justify-center items-center lg:flex-[4]">
        <Link href="#" external>
          <img
            width="300"
            src={stadtFfmUrl.src}
            alt="Stadt Frankfurt"
            className="max-w-[70vw]"
          />
        </Link>
        <Link href="#" external>
          <img
            width="300"
            src={gaFfmUrl.src}
            alt="Gesundheitsamt Frankfurt"
            className="max-w-[70vw]"
          />
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
