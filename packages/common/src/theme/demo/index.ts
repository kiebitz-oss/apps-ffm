import type { Theme } from "../Theme";
import logoUrl from "./assets/demo-logo.svg";
import FaqDe from "./content/faq.de.mdx";
import FaqEn from "./content/faq.en.mdx";
import Imprint from "./content/imprint.mdx";
import Privacy from "./content/privacy.mdx";
import "./demo.css";

export const demoTheme: Theme = {
  title: "Impfterm.in",
  supportEmail: "impftermin@inoeg.de ",
  logoAlt: "Impfterm.in",
  logoUrl,
  content: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    imprint: Imprint,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    privacy: Privacy,
    faqDe: FaqDe,
    faqEn: FaqEn,
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
