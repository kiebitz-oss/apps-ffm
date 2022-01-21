import { Link, Message, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import type { NextPage } from "next";

const LoggedOutPage: NextPage = () => {
  return (
    <main className="content">
      <Title>
        <Trans id="mediator.logged-out.title"></Trans>
      </Title>

      <Message variant="success">
        <Trans id="mediator.logged-out.notice">
          Sie wurden erfolgreich abgemeldet. Sie können sich jederzeit mit Ihrer
          Schlüsseldatei wieder anmelden.
        </Trans>
      </Message>

      <Link href="/mediator" type="button" variant="primary">
        <Trans id="mediator.logged-out.log-in-again">Einloggen</Trans>
      </Link>
    </main>
  );
};

export default LoggedOutPage;
