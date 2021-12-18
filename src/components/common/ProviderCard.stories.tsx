import { ComponentMeta } from "@storybook/react";
import { providers } from "components/data";
import { ProviderCard } from "./ProviderCard";

export default {
  component: ProviderCard,
} as ComponentMeta<typeof ProviderCard>;

export const Default = () => <ProviderCard provider={providers[0]} />;
