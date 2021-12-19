import { Logout16 } from "@carbon/icons-react";
import { Link } from "components/Link";

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/provider/schedule" className="hover">
            Terminplan
          </Link>
        </li>
        <li>
          <Link href="/provider/settings" className="hover">
            Einstellungen
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/provider/logout" className="hover">
            <Logout16 />
            Abmelden
          </Link>
        </li>
      </ul>
    </nav>
  );
};
