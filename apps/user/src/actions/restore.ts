import { getApi } from "./getApi";
import { setBooking } from "./setBooking";
import { setSecret } from "./setSecret";
import { setUserQueueToken } from "./setUserQueueToken";

export const restore = async (secret: string) => {
  const backup = await getApi().restoreFromBackup(secret);

  setSecret(secret);
  setUserQueueToken(backup.userQueueToken);
  setBooking(backup.bookings[0] ?? undefined);

  return backup;
};
