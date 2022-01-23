import { Link, PageHeader } from "@impfen/common";
import { t, Trans } from "@lingui/macro";
import type { NextPage } from "next";

const LoggedOutPage: NextPage = () => {
  return (
    <main className="content">
      <PageHeader
        title={t({
          id: "mediator.logged-out.title",
          message: "Erfolgreich abgemeldet",
        })}
        intro={t({
          id: "mediator.logged-out.notice",
          message:
            "Sie wurden erfolgreich abgemeldet. Sie können sich jederzeit mit Ihrer Schlüsseldatei wieder anmelden.",
        })}
      />

      <Link href="/mediator" type="button" variant="primary">
        <Trans id="mediator.logged-out.log-in-again">Einloggen</Trans>
      </Link>
    </main>
  );
};

export default LoggedOutPage;
