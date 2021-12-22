import { Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";
import gaFfmUrl from "../../public/assets/ga-ffm-logo.svg";
import stadtFfmUrl from "../../public/assets/stadt-ffm-logo.svg";
import { Link } from "./Link";
import { useI18n } from "./useI18n";

export interface NavContent {
  className?: string;
}

const NavContent: React.FC<NavContent> = ({ className, ...props }) => {
  const router = useRouter();
  const i18n = useI18n();
  const locale = i18n.locale?.toLowerCase() || "de";

  return (
    <>
      <div className="flex flex-col gap-10 sm:flex-[1] sm:gap-8">
        <section>
          <Title as="h3" variant="h4">
            <Trans id="common.footer.title.informations">Informationen</Trans>
          </Title>

          <ul>
            <li>
              <Link href="/">
                <Trans id="common.footer.link.booking">
                  Impfterminen buchen
                </Trans>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <Trans id="common.footer.link.faq">Fragen & Antworten</Trans>
              </Link>
            </li>
          </ul>
        </section>

        <section>
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
      </div>

      <section className="sm:flex-[1]">
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

      <section className="flex flex-col gap-4 items-center mt-auto mb-8 sm:flex-[4] sm:justify-center sm:mt-0 sm:mb-0">
        <Link href="#" external>
          <img
            width="300"
            src={stadtFfmUrl.src}
            alt="Stadt Frankfurt"
            className="max-w-[70vw] md:max-w-[200px] lg:max-w-[300px]"
          />
        </Link>
        <Link href="#" external>
          <img
            width="300"
            src={gaFfmUrl.src}
            alt="Gesundheitsamt Frankfurt"
            className="max-w-[70vw] md:max-w-[200px] lg:max-w-[300px]"
          />
        </Link>
      </section>
    </>
  );
};

export default NavContent;
