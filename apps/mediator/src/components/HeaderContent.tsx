import { Login16, Logout16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { useApp } from "lib/AppProvider";

interface HeaderContentProps extends React.ComponentProps<"header"> {}

export const HeaderContent: React.FC<HeaderContentProps> = () => {
  const { isAuthenticated } = useApp();

  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <NavLink href="/providers">Impfanbieter</NavLink>
        </li>

        <li className="ml-8">
          {isAuthenticated ? (
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
