import { Calendar16, Login16, Logout16, Settings16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { Trans } from "@lingui/macro";
import { useIsAuthenticated } from "stores/app";

interface HeaderContentProps {}

export const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <nav className="hidden sm:flex sm:gap-4 sm:mt-8 md:gap-12">
      {isAuthenticated ? (
        <>
          <NavLink href="/schedule">
            <Calendar16 />
            <Trans id="header.nav.link.appointments">Impftermine</Trans>
          </NavLink>
          <NavLink href="/account">
            <Settings16 />

            <Trans id="header.nav.link.your_account">Ihr Account</Trans>
          </NavLink>
        </>
      ) : null}
      {isAuthenticated ? (
        <NavLink href="/logout">
          <Logout16 />
          <Trans id="header.nav.link.login">Abmelden</Trans>
        </NavLink>
      ) : (
        <NavLink href="/onboarding">
          <Login16 />
          <Trans id="header.nav.link.logout">Anmelden</Trans>
        </NavLink>
      )}
    </nav>
  );
};
