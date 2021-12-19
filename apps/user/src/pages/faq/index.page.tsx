// import { useI18n } from "components/common/useI18n";
import { useI18n } from "components/common/useI18n";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const FaqEnPage = dynamic(() => import("./faq.en.mdx"));
const FaqDePage = dynamic(() => import("./faq.de.mdx"));

const FaqPage: NextPage = () => {
  const i18n = useI18n();
  const locale = i18n.locale;
  // const locale = "de";

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
