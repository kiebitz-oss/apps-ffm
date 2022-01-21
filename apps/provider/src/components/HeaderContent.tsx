import { Login16, Logout16 } from "@carbon/icons-react";
import { NavLink } from "@impfen/common";
import { useAppState } from "lib/AppProvider";

interface HeaderContentProps {
  locale?: string;
  setLocale: (locale: string) => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  locale,
  setLocale,
}) => {
  const { isAuthenticated } = useAppState();

  return (
    <nav className="hidden gap-12 justify-center sm:flex">
      {isAuthenticated ? (
        <>
          <NavLink href="/schedule">Impftermine</NavLink>
          <NavLink href="/account">Ihr Account</NavLink>
        </>
      ) : null}
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
    </nav>
  );
};
