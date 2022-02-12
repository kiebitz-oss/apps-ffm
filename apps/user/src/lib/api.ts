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
  const secret = getSecret();

  const newUserToken = await createUserQueueToken(secret);

  // const publicAppointment =
  //   appointment && "slotData" in appointment === false
  //     ? await getAppointment(appointment.id, appointment.provider.id)
  //     : (appointment as PublicAppointment<Vaccine>);

  const publicAppointment = await getAppointment(
    appointment.id,
    appointment.provider.id
  );

  const newBooking = await getApi().bookAppointment(
    publicAppointment,
    newUserToken
  );

  booking.set(newBooking);
  token.set(newUserToken);

  return get(booking);
};

export const cancelBooking = async (booking: Booking<Vaccine>) => {
  const result = await getApi().cancelBooking(booking);

  if (result) {
    reset();
  }

  return result;
};

export const getAppointment = async (
  appointmentId: string,
  providerId: string
) => {
  return getAnonymousApi().getAppointment(appointmentId, providerId);
};

export const getAppointments = (
  date: Dayjs,
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return getAnonymousApi().getAggregatedAppointments(date, zipFrom, zipTo);
};

export const checkBookingStatus = (booking: Booking<Vaccine>) => {
  return getApi().checkBookingStatus(booking);
};

export const getProviders = async (
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return getAnonymousApi().getProviders(zipFrom, zipTo);
};

export const backup = async () => {
  const secret = getSecret();
  const booking = getBooking();
  const token = getToken();

  if (!secret || !token) {
    return false;
  }

  const result = await getApi().backupData(
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
  const backup = await getApi().restoreFromBackup(restoreSecret);

  booking.set(backup.bookings[0]);
  token.set(backup.userQueueToken);
  secret.set(restoreSecret);

  return false;
};

// private helpers
const getSecret = () => {
  let storedSecret = get(secret);

  if (!storedSecret) {
    storedSecret = getApi().generateSecret();

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
  return getApi().getQueueToken(secret, contactData, inviteCode);
};

const getApi = () => {
  return !userApi ? (userApi = new UserApi<Vaccine>(getApiConfig())) : userApi;
};

const getAnonymousApi = () => {
  return !anonymousApi
    ? (anonymousApi = new AnonymousApi<Vaccine>(getApiConfig()))
    : anonymousApi;
};

const reset = () => {
  booking.set(null);
  token.set(null);
  secret.set(null);

  localStorage.clear();
  sessionStorage.clear();
};
