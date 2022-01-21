import { Link, Loading, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { ProvidersContainer } from "components";
import type { NextPage } from "next";
import { Suspense, useState } from "react";

const ProvidersPage: NextPage = () => {
  const [showPending, setShowPending] = useState<boolean>(true);

  return (
    <main>
      <div className="flex flex-row justify-between mb-8">
        <Title>
          <Trans id="mediator.providers.title">Impfstellen anzeigen</Trans>
        </Title>

        <div className="buttons-list">
          <Link
            href="/providers"
            type="button"
            className="primary sm"
            onClick={(event) => {
              event.preventDefault();
              setShowPending(true);
            }}
          >
            Unbestätigte Impfstellen
          </Link>
          <Link
            href="/providers"
            type="button"
            className="primary sm"
            onClick={(event) => {
              event.preventDefault();
              setShowPending(false);
            }}
          >
            Bestätigte Impfstellen
          </Link>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <ProvidersContainer pending={showPending} />
      </Suspense>
    </main>
  );
};

export default ProvidersPage;
