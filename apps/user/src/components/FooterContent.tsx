import { Link, Title } from "@impfen/common";
import gaFfmUrl from "@impfen/common/assets/ga-ffm-logo.svg";
import stadtFfmUrl from "@impfen/common/assets/stadt-ffm-logo.svg";
import { Trans } from "@lingui/macro";
import { useRouter } from "next/router";

export interface FooterContentContent {
  className?: string;
  locale?: string;
  setLocale: (locale: string) => void;
}

export const FooterContent: React.FC<FooterContentContent> = ({
  locale = "de",
  setLocale,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-10 sm:flex-[1] sm:gap-8 ">
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
                onClick={(event) => {
                  event.preventDefault();
                  setLocale("de");
                }}
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
                onClick={(event) => {
                  event.preventDefault();
                  setLocale("en");
                }}
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
            <Link href="https://github.com/impfen" external>
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

      <section className="hidden flex-col gap-4 items-center mt-auto mb-8 sm:flex sm:flex-[1] sm:justify-center sm:my-0 xl:flex-[2]">
        <Link href="https://frankfurt.de/" external>
          <img
            width="300"
            src={stadtFfmUrl}
            alt="Stadt Frankfurt"
            className="max-w-[70vw] md:max-w-[200px] lg:max-w-[300px]"
          />
        </Link>
        <Link
          href="https://frankfurt.de/service-und-rathaus/verwaltung/aemter-und-institutionen/gesundheitsamt"
          external
        >
          <img
            width="300"
            src={gaFfmUrl}
            alt="Gesundheitsamt Frankfurt"
            className="max-w-[70vw] md:max-w-[200px] lg:max-w-[300px]"
          />
        </Link>
      </section>
    </>
  );
};
