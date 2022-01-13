import { Link } from "./Link";

export interface HeaderProps extends React.ComponentProps<"header"> {}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="flex justify-between items-center px-8 min-w-full min-h-[86px] md:px-12 md:min-h-[100px]">
      <h1>
        <Link href="/">
          <img src="/assets/ffm-logo.svg" alt="Impfen Frankfurt" />
        </Link>
      </h1>

      {children}
    </header>
  );
};
