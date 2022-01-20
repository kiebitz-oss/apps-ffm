import { Button, Text, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

const LogoutPage: NextPage = () => {
  const router = useRouter();
  const { logout } = useApp();

  const logOut: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    await logout();

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
            Möchten Sie sich wirklich abmelden? Bitte stellen Sie vorher sicher,
            dass Sie Ihren Datenschlüssel heruntergeladen haben und diesen
            sicher verwahren. Der Datenschlüssel ist zur erneuten Anmeldung am
            System zwingend erforderlich.
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
