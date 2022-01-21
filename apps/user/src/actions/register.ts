import type { ContactData } from "vanellus";
import { createUserQueueToken } from "./createUserQueueToken";
import { getUserQueueToken } from "./getUserQueueToken";

export const register = async (
  contactData?: ContactData,
  inviteCode?: string
) => {
  let token = getUserQueueToken();

  if (!token) {
    token = await createUserQueueToken(contactData, inviteCode);
  }

  return token;
};
