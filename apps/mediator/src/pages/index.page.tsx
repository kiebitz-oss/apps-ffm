import { Section, Title } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { LoginForm } from "components/LoginForm";
import { useApp } from "lib/AppProvider";
import type { NextPage } from "next";

const MediatorStartPage: NextPage = () => {
  const { isAuthenticated } = useApp();

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

            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg flex items-center p-5">
                <div className="ml-5 w-0 flex-1">
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

              <div className="bg-white overflow-hidden shadow rounded-lg flex items-center p-5">
                <div className="ml-5 w-0 flex-1">
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

              <div className="bg-white overflow-hidden shadow rounded-lg flex items-center p-5">
                <div className="ml-5 w-0 flex-1">
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
