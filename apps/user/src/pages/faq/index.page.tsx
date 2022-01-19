import { useLingui } from "@lingui/react";
import type { NextPage } from "next";
import FaqDePage from "./de.page.mdx";
import FaqEnPage from "./en.page.mdx";

const FaqPage: NextPage = () => {
  const { i18n } = useLingui();
  const locale = i18n.locale;

  switch (locale) {
    case "en": {
      return <FaqEnPage />;
    }

    case "de":
    default: {
      return <FaqDePage />;
    }
  }
};

export default FaqPage;
