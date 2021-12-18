import { Trans } from "@lingui/macro";
import { useMediatorApi } from "components/mediator/common/MediatorApiContext";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Text, Title } from "ui";

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const api = useMediatorApi();

  const logOut = () => {
    api.logout().then(() => {
      router.push("/mediator/login");
    });
  };

  return (
    <main>
      <section>
        <Title>
          <Trans id="mediator.logout.title">Abmelden</Trans>
        </Title>

        <Text>
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
