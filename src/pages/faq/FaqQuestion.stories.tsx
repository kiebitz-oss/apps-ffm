import type { Meta } from "@storybook/react";
import { FaqQuestion, FaqQuestionProps } from "./FaqQuestion";

export default {
  component: FaqQuestion,
} as Meta<FaqQuestionProps>;

export const Default = () => (
  <FaqQuestion question="Question to be asked">Answer to be given</FaqQuestion>
);
