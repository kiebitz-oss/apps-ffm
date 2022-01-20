import { useRouter } from "next/router";
import { Link, LinkProps } from "./Link";

export interface NavLinkProps extends LinkProps {
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ exact, ...props }) => {
  const router = useRouter();

  return (
    <Link
      current={
        exact
          ? router.asPath === props.href
          : router.asPath.startsWith(props.href)
      }
      {...props}
    />
  );
};
