import type { NextPage } from "next";
import { useI18n } from "../../components/useI18n";
import FaqDePage from "./faq.de.mdx";
import FaqEnPage from "./faq.en.mdx";

const FaqPage: NextPage = () => {
  const i18n = useI18n();
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
