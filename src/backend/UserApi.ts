import { providers } from 'apps/data';
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
        return [];
    }

    public async getAppointmentsByZipCode(
        zipCode: number,
        radius = 5,
        from?: Date,
        to?: Date
    ): Promise<Appointment[]> {
        return [];
    }

    public async getAppointment(
        id: string,
        providerId: string
    ): Promise<Appointment | null> {
        return null;
    }

    public async bookAppointment(
        appointmentId: string,
        providerID: string
    ): Promise<boolean> {
        return true;
    }

    public async cancelAppointment(
        appointmentId: string,
        providerID: string
    ): Promise<boolean> {
        return true;
    }
}
