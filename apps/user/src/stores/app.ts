import type { Vaccine } from "@impfen/common";
import { getApiConfig } from "@impfen/common";
import type { Dayjs } from "dayjs";
import type {
  AggregatedPublicAppointment,
  Booking,
  ContactData,
  PublicAppointment,
  UserQueueToken,
} from "vanellus";
import { AnonymousApi, UserApi } from "vanellus";
import create from "zustand";
import { persist } from "zustand/middleware";

let anonymousApi: AnonymousApi<Vaccine>;

export const getAnonymousApi = () => {
  return !anonymousApi
    ? (anonymousApi = new AnonymousApi<Vaccine>(getApiConfig()))
    : anonymousApi;
};

let userApi: UserApi<Vaccine>;

export const getApi = () => {
  return !userApi ? (userApi = new UserApi<Vaccine>(getApiConfig())) : userApi;
};

type AppState = {
  booking?: Booking<Vaccine>;
  secret?: string;
  token?: UserQueueToken;
};

export const useApp = create<AppState>(
  persist(() => ({}), {
    name: "user:app",
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => !["secret"].includes(key))
      ),
  })
);

export const bookAppointment = async (
  appointment: AggregatedPublicAppointment<Vaccine> | PublicAppointment<Vaccine>
): Promise<Booking> => {
  const secret = getSecret();
  const token = await createUserQueueToken(secret);

  const publicAppointment =
    appointment && "slotData" in appointment === false
      ? await getAppointment(appointment.id, appointment.provider.id)
      : (appointment as PublicAppointment<Vaccine>);

  const booking = await getApi().bookAppointment(publicAppointment, token);

  useApp.setState({
    token,
    booking,
  });

  return booking;
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
  return getAnonymousApi().getAppointment(appointmentId, providerId, true);
};

export const getAppointments = (
  date: Dayjs,
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return getAnonymousApi().getAggregatedAppointments(date, zipFrom, zipTo);
};

export const getProviders = async (
  zipFrom: number | string = "00001",
  zipTo: number | string = "99999"
) => {
  return getAnonymousApi().getProviders(zipFrom, zipTo);
};

export const backup = async () => {
  const state = useApp.getState();

  if (!state.secret || !state.booking || !state.token) {
    return false;
  }

  const result = await getApi().backupData(
    {
      userQueueToken: state.token,
      bookings: state.booking ? [state.booking] : [],
    },
    state.secret
  );

  if (result) {
    return true;
  }

  return false;
};

export const restore = async (secret: string) => {
  const backup = await getApi().restoreFromBackup(secret);

  if (backup) {
    useApp.setState({
      booking: backup.bookings[0],
      token: backup.userQueueToken,
      secret,
    });

    return true;
  }

  return false;
};

// private helpers
const getSecret = () => {
  let secret = useApp.getState().secret;

  if (!secret) {
    secret = generateSecret();

    useApp.setState({
      secret,
    });
  }

  return secret;
};

const generateSecret = () => {
  return getApi().generateSecret();
};

const createUserQueueToken = async (
  secret: string,
  contactData?: ContactData,
  inviteCode?: string
) => {
  return getApi().getQueueToken(secret, contactData, inviteCode);
};

const reset = () => useApp.setState({}, true);
