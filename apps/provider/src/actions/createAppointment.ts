import { AuthError, Vaccine } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";
import { getProviderData } from "./getProviderData";

export const createAppointment = async (
  start: Date,
  duration: number,
  vaccine: Vaccine,
  slotCount: number
) => {
  const api = getApi();
  const { verifiedProvider } = await getProviderData();

  if (!verifiedProvider) {
    console.error(verifiedProvider);
    throw new AuthError("");
  }

  return api.createAppointment(
    start,
    duration,
    vaccine,
    slotCount,
    verifiedProvider,
    getKeyPairs()
  );
};
