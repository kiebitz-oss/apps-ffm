import { Login16, Logout16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { isAuthenticated } from "stores/app";

interface HeaderContentProps extends React.ComponentProps<"header"> {}

export const HeaderContent: React.FC<HeaderContentProps> = () => {
  const authenticated = isAuthenticated();

  return (
    <nav>
      <ul className="flex gap-8">
        {authenticated ? (
          <li>
            <NavLink href="/providers">Impfanbieter</NavLink>
          </li>
        ) : null}

        <li className="ml-8">
          {authenticated ? (
            <NavLink href="/logout">
              <Logout16 />
              Abmelden
            </NavLink>
          ) : (
            <NavLink href="/">
              <Login16 />
              Anmelden
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
