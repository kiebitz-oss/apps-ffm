import { Logout16 } from "@carbon/icons-react";
import { Link } from "./Link";

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/providers" className="hover">
            Impfanbieter
          </Link>
        </li>
        <li>
          <Link href="/settings" className="hover">
            Einstellungen
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/logout" className="hover">
            <Logout16 />
            Abmelden
          </Link>
        </li>
      </ul>
    </nav>
  );
};
