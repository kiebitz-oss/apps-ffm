import { Login16, Logout16, UserMultiple16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useIsAuthenticated } from "stores/app";

interface HeaderContentProps extends React.ComponentProps<"header"> {}

export const HeaderContent: React.FC<HeaderContentProps> = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <nav className="flex gap-4 sm:mt-8 md:gap-12">
      {isAuthenticated ? (
        <NavLink href="/providers">
          <UserMultiple16 />
          <Trans id="header.nav.link.providers">Übersicht Impfstellen</Trans>
        </NavLink>
      ) : null}

      <div className="ml-8">
        {isAuthenticated ? (
          <NavLink href="/logout">
            <Logout16 />
            <Trans id="header.nav.link.logout">Abmelden</Trans>
          </NavLink>
        ) : (
          <NavLink href="/">
            <Login16 />
            <Trans id="header.nav.link.login">Anmelden</Trans>
          </NavLink>
        )}
      </div>
    </nav>
  );
};
