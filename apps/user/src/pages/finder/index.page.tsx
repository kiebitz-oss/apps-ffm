import { CheckboxField, Loading, Page, PageHeader } from "@impfen/common";
import { t } from "@lingui/macro";
import { ProvidersList } from "components/finder";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { Suspense, useCallback } from "react";
import { useApp } from "stores/app";
import { setAccessible, useFinder } from "stores/finder";

const ProvidersFilter: NextPage = () => {
  const accessible = useFinder((state) => state.accessible);

  const handleAccessibleChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setAccessible(event.currentTarget.checked ? true : undefined);
    }, []);

  return (
    <div className="mx-4 mb-8 lg:mx-8">
      <CheckboxField
        name="accessible"
        label={t({
          id: "user.finder.location.accessible.label",
          message: "Nur barrierefreie Impfstellen",
        })}
        onChange={handleAccessibleChange}
        checked={accessible}
      />
    </div>
  );
};

const ProviderStep: React.FC = () => {
  const accessible = useFinder((state) => state.accessible);

  const router = useRouter();
  const booking = useApp((state) => state.booking);

  if (booking) {
    router.push("/finder/success");

    return null;
  }

  return (
    <Page>
      <PageHeader
        title={t({
          id: "user.finder.location.title",
          message: "Impfstellen",
        })}
        backLink={{
          title: t({
            id: "user.finder.location.back-link",
            message: "Zurück zu den allgemeinen Informationen",
          }),
          href: "/",
        }}
        intro={t({
          id: "user.finder.location.intro",
          message:
            "Wählen Sie aus den möglichen Optionen, wo Sie geimpft werden möchten.",
        })}
      />

      <ProvidersFilter />

      <Suspense fallback={<Loading />}>
        <ProvidersList accessible={accessible} />
      </Suspense>
    </Page>
  );
};

export default ProviderStep;
