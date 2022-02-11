import type { Theme } from "../Theme";
import logoUrl from "./assets/demo-logo.svg";
import Imprint from "./content/imprint.mdx";
import Privacy from "./content/privacy.mdx";
import "./demo.css";

export const demoTheme: Theme = {
  title: "Impfterm.in",
  supportEmail: "impftermin@inoeg.de ",
  logoAlt: "Impfterm.in",
  logoUrl,
  content: {
    imprint: Imprint,
    privacy: Privacy,
  },
  meta: {
    title: "Impfterm.in",
    siteName: "Impfterm.in",
    description: "Impfterm.in",
    url: "https://impfterm.in",
    type: "website",
    robots: "follow, index",
    image: "",
  },
};
