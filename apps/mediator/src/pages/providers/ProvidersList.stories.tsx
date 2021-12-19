import { providers } from "@kiebitz-oss/api";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MediatorApiProvider } from "../MediatorApiContext";
import { ProviderList } from "./ProvidersList";

export default {
  component: ProviderList,
  decorators: [
    (Story) => (
      <MediatorApiProvider>
        <Story />
      </MediatorApiProvider>
    ),
  ],
  args: {
    providers: providers,
  },
} as ComponentMeta<typeof ProviderList>;

export const Default: ComponentStory<typeof ProviderList> = (args) => (
  <ProviderList {...args} />
);
