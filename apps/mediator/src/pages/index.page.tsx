import { PageHeader, Section } from "@impfen/common";
import { t } from "@lingui/macro";
import { LoginForm } from "components";
import type { NextPage } from "next";
import { isAuthenticated } from "stores/app";

const MediatorStartPage: NextPage = () => {
  const authenticated = isAuthenticated();

  return (
    <main>
      <Section className="mt-10 w-full sm:mt-0">
        {authenticated ? (
          <>
            <PageHeader
              title={t({
                id: "mediator.welcome.title-authenticated",
                message: "Willkommen",
              })}
            />

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
            <PageHeader
              title={t({
                id: "mediator.welcome.title-unauthenticated",
                message: "Als Mediator anmelden",
              })}
            />

            <LoginForm />
          </>
        )}
      </Section>
    </main>
  );
};

export default MediatorStartPage;
