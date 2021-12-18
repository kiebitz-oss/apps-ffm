import type { Meta } from "@storybook/react";
import FinderPage from "pages/user/finder/[[...step]]";
import { UserApiProvider } from "./common/UserApiContext";

export default {
  component: FinderPage,
} as Meta;

export const Default = () => (
  <UserApiProvider>
    <FinderPage />
  </UserApiProvider>
);
