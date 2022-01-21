import { AuthError, Vaccine } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";
import { getProviderData } from "./getProviderData";

export const createAppointmentSeries = async (
  startAt: Date,
  endAt: Date,
  interval: number,
  vaccine: Vaccine,
  lanes: number
) => {
  const api = getApi();
  const { verifiedProvider } = await getProviderData();

  if (!verifiedProvider) {
    throw new AuthError("Please authenticate");
  }

  return api.createAppointmentSeries(
    startAt,
    endAt,
    interval,
    lanes,
    vaccine,
    verifiedProvider,
    getKeyPairs()
  );
};
