import { Login16, Logout16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { useApp } from "lib/AppProvider";

interface HeaderContentProps {
  locale?: string;
  setLocale: (locale: string) => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  locale,
  setLocale,
}) => {
  const { isAuthenticated } = useApp();

  return (
    <nav>
      <ul className="flex gap-8">
        {isAuthenticated ? (
          <>
            <li>
              <NavLink href="/schedule">Impftermine</NavLink>
            </li>
            <li>
              <NavLink href="/account">Ihr Account</NavLink>
            </li>
          </>
        ) : null}
        <li className="ml-8">
          {isAuthenticated ? (
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
        </li>
      </ul>
    </nav>
  );
};
