import type { Meta } from "@storybook/react";
import FinderPage from "pages/finder/[[...step]]";
import { UserApiProvider } from "./UserApiContext";

export default {
  component: FinderPage,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderPage />
  </UserApiProvider>
);
