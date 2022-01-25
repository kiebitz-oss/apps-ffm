import {
  Divider,
  Link,
  Page,
  PageHeader,
  Section,
  Text,
  Title,
} from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import { LoginForm } from "components";
import type { NextPage } from "next";

const ProviderStartPage: NextPage = () => {
  return (
    <Page>
      <PageHeader
        title={t({
          id: "provider.welcome.title",
          message: "Impfstelle",
        })}
      />

      <div className="max-w-3xl">
        <Section className="mt-10 w-full sm:mt-0">
          <Title variant="h2">
            <Trans id="provider.welcome.register.title">
              Als Impfstelle registrieren
            </Trans>
          </Title>

          <Text>
            <Trans id="provider.welcome.register.intro">
              Text dies das Dinge
            </Trans>
          </Text>

          <Link type="button" variant="primary" href="/onboarding">
            <Trans id="provider.welcome.register.link-start">
              Registrierung starten
            </Trans>
          </Link>
        </Section>

        <Divider className="my-12" />

        <Section className="mt-10 w-full sm:mt-0">
          <Title variant="h2">
            <Trans id="provider.welcome.login.title">
              Als Impfstelle einloggen
            </Trans>
          </Title>

          <Text>
            <Trans id="provider.welcome.login.intro">Text dies das Dinge</Trans>
          </Text>

          <LoginForm className="mt-5 w-full md:col-span-2 md:mt-0" />
        </Section>
      </div>
    </Page>
  );
};

export default ProviderStartPage;
