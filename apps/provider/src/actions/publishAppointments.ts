import type { UnpublishedPublicAppointment } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const publishAppointments = (
  unpublishedAppointments: UnpublishedPublicAppointment[]
) => {
  return getApi().publishAppointments(unpublishedAppointments, getKeyPairs());
};
