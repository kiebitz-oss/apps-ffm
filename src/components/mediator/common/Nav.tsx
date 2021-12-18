import { Logout16 } from "@carbon/icons-react";
import { Link } from "ui";

export const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-8">
        <li>
          <Link href="/mediator/providers" className="hover">
            Impfanbieter
          </Link>
        </li>
        <li>
          <Link href="/mediator/settings" className="hover">
            Einstellungen
          </Link>
        </li>
        <li className="ml-8">
          <Link href="/mediator/logout" className="hover">
            <Logout16 />
            Abmelden
          </Link>
        </li>
      </ul>
    </nav>
  );
};
