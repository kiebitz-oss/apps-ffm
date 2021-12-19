import type { Meta } from "@storybook/react";
import { UserApiProvider } from "../UserApiContext";
import FinderPage from "./[[...step]].page";

export default {
  component: FinderPage,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderPage />
  </UserApiProvider>
);
