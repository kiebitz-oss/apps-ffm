import { Link, Loading, Page, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import { ProvidersContainer } from "components";
import type { NextPage } from "next";
import { Suspense, useState } from "react";

const ProvidersPage: NextPage = () => {
  const [showPending, setShowPending] = useState<boolean>(true);

  return (
    <Page>
      <PageHeader
        title={t({
          id: "mediator.providers.title",
          message: "Impfstellen anzeigen",
        })}
      >
        <div className="buttons-list">
          <Link
            href="/providers"
            type="button"
            variant={showPending ? "primary" : "secondary"}
            size="sm"
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
            variant={showPending ? "secondary" : "primary"}
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              setShowPending(false);
            }}
          >
            Bestätigte Impfstellen
          </Link>
        </div>
      </PageHeader>

      <Suspense fallback={<Loading />}>
        <ProvidersContainer pending={showPending} />
      </Suspense>
    </Page>
  );
};

export default ProvidersPage;
