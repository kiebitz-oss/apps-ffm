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
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIsAuthenticated } from "stores/app";

const ProviderStartPage: NextPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, router]);

  return (
    <Page narrow>
      <PageHeader
        title={t({
          id: "provider.welcome.title",
          message: "Impfstelle",
        })}
      />

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
    </Page>
  );
};

export default ProviderStartPage;
