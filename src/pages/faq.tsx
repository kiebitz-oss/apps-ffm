import { useI18n } from "components/common/useI18n";
import dynamic from "next/dynamic";

const FaqEn = dynamic(() => import("./faq.en.mdx"));
const FaqDe = dynamic(() => import("./faq.de.mdx"));

const FaqPage: React.FC = () => {
  const i18n = useI18n();

  return i18n.locale === "en" ? <FaqEn /> : <FaqDe />;
};

export default FaqPage;
