import { Login16, Logout16 } from "@carbon/icons-react";
import { Link } from "@impfen/common";
import { useProviderApi } from "components/ProviderApiContext";

interface HeaderContentProps {
  locale?: string;
  setLocale: (locale: string) => void;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  locale,
  setLocale,
}) => {
  const api = useProviderApi();

  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/schedule">Terminplan</Link>
        </li>
        <li>
          <Link href="/settings">Einstellungen</Link>
        </li>
        <li className="ml-8">
          {true === api.isAuthenticated() ? (
            <Link href="/logout">
              <Logout16 />
              Abmelden
            </Link>
          ) : (
            <Link href="/onboarding">
              <Login16 />
              Anmelden
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
