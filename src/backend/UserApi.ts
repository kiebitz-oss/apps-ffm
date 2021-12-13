import { appointments, providers } from 'apps/data';
import { Appointment, PublicProvider } from 'types';

export class UserApi {
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
        return appointments[Number(id) - 1]
            ? appointments[Number(id) - 1]
            : null;
    }

    public async bookAppointment(
        appointmentId: string,
        providerID: string
    ): Promise<string> {
        return '1234';
    }

    public async cancelAppointment(
        appointmentId: string,
        providerID: string
    ): Promise<boolean> {
        return true;
    }
}
