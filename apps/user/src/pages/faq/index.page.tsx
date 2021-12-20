import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useI18n } from "../../components/useI18n";

const FaqEnPage = dynamic(() => import("./faq.en.mdx"));
const FaqDePage = dynamic(() => import("./faq.de.mdx"));

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
