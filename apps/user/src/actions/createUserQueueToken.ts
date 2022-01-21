import type { ContactData } from "vanellus";
import { getApi } from "./getApi";
import { getSecret } from "./getSecret";

export const createUserQueueToken = async (
  contactData?: ContactData,
  inviteCode?: string,
  force: boolean = true
) => {
  return getApi().getQueueToken(getSecret(force), contactData, inviteCode);
};
