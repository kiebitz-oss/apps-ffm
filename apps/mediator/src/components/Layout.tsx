import { useState } from "react";
import Footer from "./Footer";
import { Header } from "./Header";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Header onMobileNavClick={() => setNavOpen(!navOpen)} />

      {children}

      <div className={navOpen ? "open" : "closed"}>
        <Footer />
      </div>
    </>
  );
};
