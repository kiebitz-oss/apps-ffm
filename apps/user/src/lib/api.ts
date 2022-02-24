import type { Vaccine } from "@impfen/common";
import { getApiConfig } from "@impfen/common";
import type { Dayjs } from "dayjs";
import { get } from "svelte/store";
import {
  AnonymousApi,
  UserApi,
  type AggregatedPublicAppointment,
  type Booking,
  type ContactData,
  type PublicAppointment,
} from "vanellus";
import { booking, secret, token } from "./stores";

let anonymousApi: AnonymousApi<Vaccine>;
let userApi: UserApi<Vaccine>;

export const bookAppointment = async (
  appointment: AggregatedPublicAppointment<Vaccine> | PublicAppointment<Vaccine>
): Promise<Booking<Vaccine>> => {
  const secret = await getSecret();

  const newUserToken = await createUserQueueToken(secret);

  const publicAppointment = await getAppointment(
    appointment.id,
    appointment.provider.id
  );

  const newBooking = await (
    await getApi()
  ).bookAppointment(publicAppointment, newUserToken);

  booking.set(newBooking);
  token.set(newUserToken);

  return get(booking);
};

export const cancelBooking = async (booking: Booking<Vaccine>) => {
  const result = await (await getApi()).cancelBooking(booking);

  if (result) {
    reset();
  }

  return result;
};

export const getAppointment = async (
  appointmentId: string,
  providerId: string
) => {
  return (await getAnonymousApi()).getAppointment(appointmentId, providerId);
};

export const getAppointments = async (
  date: Dayjs,
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return (await getAnonymousApi()).getAggregatedAppointments(
    date,
    zipFrom,
    zipTo
  );
};

export const checkBookingStatus = async (booking: Booking<Vaccine>) => {
  return (await getApi()).checkBookingStatus(booking);
};

export const getProviders = async (
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return (await getAnonymousApi()).getProviders(zipFrom, zipTo);
};

export const backup = async () => {
  const secret = await getSecret();
  const booking = getBooking();
  const token = getToken();

  if (!secret || !token) {
    return false;
  }

  const result = await (
    await getApi()
  ).backupData(
    {
      userQueueToken: token,
      bookings: booking ? [booking] : [],
    },
    secret
  );

  if (result) {
    return true;
  }

  return false;
};

export const restore = async (restoreSecret: string) => {
  const backup = await (await getApi()).restoreFromBackup(restoreSecret);

  booking.set(backup.bookings[0]);
  token.set(backup.userQueueToken);
  secret.set(restoreSecret);

  return false;
};

// private helpers
const getSecret = async () => {
  let storedSecret = get(secret);

  if (!storedSecret) {
    storedSecret = (await getApi()).generateSecret();

    secret.set(storedSecret);
  }

  return storedSecret;
};

const getBooking = () => {
  return get(booking);
};

const getToken = () => {
  return get(token);
};

export const login = async (secret: string) => {
  await restore(secret);

  return true;
};

export const logout = async () => {
  await backup();

  reset();

  return true;
};

const createUserQueueToken = async (
  secret: string,
  contactData?: ContactData,
  inviteCode?: string
) => {
  return (await getApi()).getQueueToken(secret, contactData, inviteCode);
};

const getApi = async () => {
  return !userApi
    ? (userApi = new UserApi<Vaccine>(await getApiConfig()))
    : userApi;
};

const getAnonymousApi = async () => {
  return !anonymousApi
    ? (anonymousApi = new AnonymousApi<Vaccine>(await getApiConfig()))
    : anonymousApi;
};

const reset = () => {
  booking.set(null);
  token.set(null);
  secret.set(null);

  localStorage.clear();
  sessionStorage.clear();
};
