import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import logoUrl from "../../assets/ffm-logo.svg";
import { Link } from "../Link";
import { Hamburger } from "./Hamburger";

export interface HeaderProps extends React.ComponentProps<"header"> {
  mobile: any;
}

export const Header: React.FC<HeaderProps> = ({ children, mobile }) => {
  const router = useRouter();
  const MobileContent = mobile;

  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setShowMenu(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
      <Link href="/">
        <img src={logoUrl} alt="Impfen Frankfurt" />
      </Link>

      <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
        <Hamburger />
      </button>

      {mobile && (
        <aside
          className={clsx(
            "flex fixed inset-x-0 top-[80px] bottom-0 z-50 flex-col gap-10 p-8 w-full min-h-[100vh-80px] bg-white sm:hidden",
            {
              ["hidden"]: !showMenu,
            }
          )}
        >
          <MobileContent />
        </aside>
      )}

      {children}
    </header>
  );
};