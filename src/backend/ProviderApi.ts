import { appointments } from 'apps/data';
import type {
    Appointment,
    Provider,
    ProviderKeyPair,
    ProviderSecretData,
} from 'types';

export class ProviderApi {
    protected secret: string | null = null;
    protected keyPair: ProviderKeyPair | null = null;
    protected appointments: Appointment[] = [];

    public async authenticate(
        secret: string,
        keyPair: ProviderKeyPair
    ): Promise<boolean> {
        this.keyPair = keyPair;
        this.secret = secret;
        return false;
    }

    public async isAuthenticated(): Promise<boolean> {
        return !!this.secret && !!this.keyPair;
    }

    public async logout(): Promise<boolean> {
        this.secret = null;
        this.keyPair = null;

        return true;
    }

    public async refetchAppointments(): Promise<Appointment[]> {
        this.appointments = appointments;

        return this.appointments;
    }

    public async getAppointments(): Promise<Appointment[]> {
        return this.appointments;
    }

    public async createAppointments(
        appointment: Appointment
    ): Promise<boolean> {
        try {
            appointment.modified = true;

            this.appointments.push(appointment);

            return true;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    public async publishAppointments(): Promise<boolean> {
        try {
            this.appointments.forEach((appointment) => {
                appointment.modified = undefined;
            });

            return true;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    public async updateAppointment(appointment: Appointment): Promise<boolean> {
        return false;
    }

    public async cancelAppointment(appointmentId: string): Promise<boolean> {
        return false;
    }

    public async storeProvider(provider: Provider): Promise<boolean> {
        return false;
    }

    public async backupData(): Promise<ProviderSecretData> {
        return {
            secret: '1234567890',
            keyPair: 'foobar',
        };
    }
}
