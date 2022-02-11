// import gaFfmUrl from "@impfen/common/assets/ga-ffm-logo.svg";
// import stadtFfmUrl from "@impfen/common/assets/stadt-ffm-logo.svg";
import type { Theme } from "../Theme";
import logoUrl from "./assets/ffm-logo.svg";
import Imprint from "./content/imprint.mdx";
import Privacy from "./content/privacy.mdx";
import "./ffm.css";

export const ffmTheme: Theme = {
  title: "Impfterm.in",
  supportEmail: "impftermin@inoeg.de ",
  logoAlt: "Impfterm.in",
  logoUrl,
  content: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    imprint: Imprint,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
