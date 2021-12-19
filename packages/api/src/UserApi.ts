import { User as KiebitzUser } from "vanellus";
import { backend } from "./backend";
import { appointments, providers } from "./fixtures/data";
import { Appointment, PublicProvider } from "./types";
import { b642buf } from "./utils/conversion";
import { buf2base32, randomBytes } from "./utils/crypto";

export class UserApi {
  protected user: KiebitzUser;

  constructor() {
    this.user = new KiebitzUser("main", backend);
    //     // console.log(this.kiebitz);

    //     // this.kiebitz.queueData = {
    //     //     zipCode: '60306',
    //     // };

    //     // const today = formatDate(new Date());

    //     // this.kiebitz
    //     //     .getAppointments({
    //     //         from: today,
    //     //         to: today,
    //     //     })
    //     //     .then((result) => {
    //     //         console.log(result);
    //     //     });
  }

  public async getProvidersByZip(
    zipCode: number,
    radius = 5
  ): Promise<PublicProvider[]> {
    return providers;
  }

  public async getAppointmentsByProvider(
    providerId: string,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]> {
    return appointments;
  }

  public async getAppointmentsByZipCode(
    zipCode: number,
    radius = 5,
    from?: Date,
    to?: Date
  ): Promise<Appointment[]> {
    return appointments;
  }

  public async getAppointment(
    id: string,
    providerId: string
  ): Promise<Appointment | null> {
    return appointments[Number(id) - 1] ? appointments[Number(id) - 1] : null;
  }

  public async bookAppointment(
    appointmentId: string,
    providerID: string
  ): Promise<string> {
    const secret = buf2base32(b642buf(randomBytes(10)));

    localStorage.set("user::secret", JSON.stringify(secret));

    return secret;
  }

  public async cancelAppointment(
    appointmentId: string,
    providerID: string
  ): Promise<boolean> {
    return true;
  }
}
