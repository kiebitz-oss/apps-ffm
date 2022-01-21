import { AuthError } from "vanellus";
import { getApi } from "./getApi";
import { getBooking } from "./getBooking";
import { getSecret } from "./getSecret";
import { getUserQueueToken } from "./getUserQueueToken";

export const backup = (force: boolean = false) => {
  const secret = getSecret(force);

  if (!secret) {
    throw new AuthError("User not authenticated");
  }

  const booking = getBooking();

  return getApi().backupData(
    {
      userQueueToken: getUserQueueToken() || undefined,
      bookings: booking ? [booking] : [],
    },
    secret
  );
};
