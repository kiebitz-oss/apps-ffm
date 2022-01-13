import { Footer } from "./Footer";
import { Header } from "./Header";
import { Nav } from "./Nav";
import NavContent from "./NavContent";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <Nav />
      </Header>

      {children}

      <Footer>
        <NavContent />
      </Footer>
    </>
  );
};
