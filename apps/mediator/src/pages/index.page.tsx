import { Section, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { LoginForm } from "components";
import { useAppState } from "lib/AppProvider";
import type { NextPage } from "next";

const MediatorStartPage: NextPage = () => {
  const { isAuthenticated } = useAppState();

  return (
    <main>
      <Section className="mt-10 w-full sm:mt-0">
        {isAuthenticated ? (
          <>
            <Title>
              <Trans id="mediator.welcome.title-authenticated">
                Willkommen
              </Trans>
            </Title>

            <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex overflow-hidden items-center p-5 bg-white shadow rounded-lg">
                <div className="flex-1 ml-5 w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Unbestätigte Impfanbieter
                    </dt>
                    <dd>
                      <div className="text-4xl font-extrabold text-gray-900">
                        23
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="flex overflow-hidden items-center p-5 bg-white shadow rounded-lg">
                <div className="flex-1 ml-5 w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Bestätigte Impfanbieter
                    </dt>
                    <dd>
                      <div className="text-4xl font-extrabold text-gray-900">
                        19
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="flex overflow-hidden items-center p-5 bg-white shadow rounded-lg">
                <div className="flex-1 ml-5 w-0">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Impfanbieter gesamt
                    </dt>
                    <dd>
                      <div className="text-4xl font-extrabold text-gray-900">
                        42
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Title>
              <Trans id="mediator.welcome.title-unauthenticated">
                Als Mediator anmelden
              </Trans>
            </Title>

            <LoginForm />
          </>
        )}
      </Section>
    </main>
  );
};

export default MediatorStartPage;
