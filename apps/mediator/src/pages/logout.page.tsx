import { Button, Text, Title } from "@kiebitz-oss/common";
import { Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const { api } = useApp();

  const logOut = () => {
    api.logout();
    router.push("/");
  };

  return (
    <main>
      <section>
        <Title>
          <Trans id="mediator.logout.title">Abmelden</Trans>
        </Title>

        <Text className="pb-8">
          <Trans id="mediator.logout.intro">
            Möchtest Du Dich wirklich abmelden? Bitte stelle vorher sicher, dass
            Du Deinen Sicherheitscode notiert hast. Nur mit diesem Code kannst
            Du Dich später wieder anmelden.
          </Trans>
        </Text>

        <Button onClick={logOut}>
          <Trans id="mediator.logout.button">Abmelden</Trans>
        </Button>
      </section>
    </main>
  );
};

export default LogoutPage;
