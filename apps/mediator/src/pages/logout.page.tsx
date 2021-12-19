import { Button, Text, Title } from "@kiebitz-oss/ui";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMediatorApi } from "./MediatorApiContext";

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const api = useMediatorApi();

  const logOut = () => {
    api.logout().then(() => {
      router.push("/login");
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
