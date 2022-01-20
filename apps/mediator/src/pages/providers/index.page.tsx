import { Link, Loading, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { ProvidersContainer } from "components/providers/ProvidersContainer";
import type { NextPage } from "next";
import { Suspense } from "react";

const ProvidersPage: NextPage = () => {
  return (
    <main>
      <div className="flex flex-row justify-between mb-8">
        <Title>
          <Title>
            <Trans id="mediator.providers.title">Impfstellen anzeigen</Trans>
          </Title>
        </Title>

        <div className="buttons-list">
          <Link href="/providers" type="button" className="primary sm">
            Unbestätigte Impfstellen
          </Link>
          <Link href="/providers" type="button" className="primary sm">
            Bestätigte Impfstellen
          </Link>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <ProvidersContainer />
      </Suspense>
    </main>
  );
};

export default ProvidersPage;
