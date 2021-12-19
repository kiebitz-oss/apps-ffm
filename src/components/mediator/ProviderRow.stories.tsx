import { ComponentMeta, ComponentStory } from "@storybook/react";
import { providers } from "components/data";
import { MediatorApiProvider } from "./MediatorApiContext";
import { ProviderRow } from "./ProviderRow";

export default {
  component: ProviderRow,
  decorators: [
    (Story) => (
      <MediatorApiProvider>
        <Story />
      </MediatorApiProvider>
    ),
  ],
  args: {
    provider: providers[0],
  },
} as ComponentMeta<typeof ProviderRow>;

export const Default: ComponentStory<typeof ProviderRow> = (args) => (
  <ProviderRow {...args} />
);
