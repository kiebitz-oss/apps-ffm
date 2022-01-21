import type {
  AggregatedPublicAppointment,
  Booking,
  PublicAppointment,
} from "vanellus";
import { VanellusError } from "vanellus";
import { createUserQueueToken } from "./createUserQueueToken";
import { getApi } from "./getApi";
import { getAppointment } from "./getAppointment";
import { getBooking } from "./getBooking";
import { setBooking } from "./setBooking";

export const bookAppointment = async (
  appointment: AggregatedPublicAppointment | PublicAppointment
): Promise<{ booking: Booking; appointment: PublicAppointment }> => {
  const userQueueToken = await createUserQueueToken();
  let booking = getBooking();

  if (booking) {
    const publicAppointment = await getAppointment(
      booking.appointmentId,
      booking.providerId
    );

    return {
      booking,
      appointment: publicAppointment,
    };
  }

  if (appointment && "slotData" in appointment === false) {
    const publicAppointment = await getAppointment(
      appointment.id,
      appointment.provider.id
    );

    booking = await getApi().bookAppointment(publicAppointment, userQueueToken);

    setBooking(booking);

    return {
      booking,
      appointment: publicAppointment,
    };
  }

  throw new VanellusError("Unknown error");
};
