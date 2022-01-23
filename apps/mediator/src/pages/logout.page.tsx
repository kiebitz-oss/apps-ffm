import { Button, PageHeader } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import { logout } from "stores/app";

const LogoutPage: NextPage = () => {
  const router = useRouter();

  const logOut: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    await logout();
    await router.push("/");
  };

  return (
    <main>
      <PageHeader
        title={t({
          id: "mediator.logout.title",
          message: "Abmelden",
        })}
        intro={t({
          id: "mediator.logout.intro",
          message:
            "Möchten Sie sich wirklich abmelden? Bitte stellen Sie vorher sicher, dass Sie Ihren Datenschlüssel heruntergeladen haben und diesen sicher verwahren. Der Datenschlüssel ist zur erneuten Anmeldung am System zwingend erforderlich.",
        })}
      />

      <Button onClick={logOut}>
        <Trans id="mediator.logout.button">Abmelden</Trans>
      </Button>
    </main>
  );
};

export default LogoutPage;
