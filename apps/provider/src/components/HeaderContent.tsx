import { Login16, Logout16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { isAuthenticated } from "stores/app";

interface HeaderContentProps {}

export const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  const authenticated = isAuthenticated();

  return (
    <nav className="hidden gap-12 justify-center sm:flex">
      {authenticated ? (
        <>
          <NavLink href="/schedule">Impftermine</NavLink>
          <NavLink href="/account">Ihr Account</NavLink>
        </>
      ) : null}
      {authenticated ? (
        <NavLink href="/logout">
          <Logout16 />
          Abmelden
        </NavLink>
      ) : (
        <NavLink href="/onboarding">
          <Login16 />
          Anmelden
        </NavLink>
      )}
    </nav>
  );
};
