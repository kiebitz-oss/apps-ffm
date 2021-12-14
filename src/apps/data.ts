import { randomBytes } from 'helpers/crypto';
import type { Appointment, PublicProvider, Slot } from 'types';

export const createSlot = (open = true): Slot => {
    return {
        id: randomBytes(32), // where the user can submit his confirmation
        open,
        status: randomBytes(32), // where the user can get the appointment status
        cancel: randomBytes(32), // where the user can cancel his confirmation
    };
};

export const createSlots = (number = 10) => {
    return Array.from(Array(number)).map(createSlot);
};

export const providers: PublicProvider[] = [
    {
        id: '1',
        name: 'Impfzentrum FFM',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: true,
        verified: true,
    },
    {
        id: '2',
        name: 'Impfzentrum FFM 2',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: false,
        verified: false,
        description:
            'Die einzigartigste und größte Latin Diskothek in Hessen, die ausschließlich dem lateinamerikanischen Lebensgefühl gewidmet ist.',
    },
    {
        id: '3',
        name: 'Impfzentrum FFM 3',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: true,
        verified: false,
    },
    {
        id: '4',
        name: 'Impfzentrum FFM 4',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: false,
        verified: false,
    },
    {
        id: '5',
        name: 'Impfzentrum FFM 5',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: false,
        verified: false,
    },
    {
        id: '6',
        name: 'Impfzentrum FFM 6',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: true,
        verified: false,
    },
    {
        id: '7',
        name: 'Impfzentrum FFM 7',
        street: 'Ludwig-Ehrhard-Anlage 1',
        zipCode: '60327',
        city: 'Frankfurt am Main',
        accessible: false,
        verified: true,
    },
];

export const appointments: Appointment[] = [
    {
        id: randomBytes(),
        duration: 90,
        date: new Date(),
        provider: providers[0],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'mrna',
    },
    {
        id: randomBytes(),
        duration: 60,
        date: new Date(),
        provider: providers[1],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'moderna',
    },
    {
        id: randomBytes(),
        duration: 60,
        date: new Date(),
        provider: providers[2],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'biontech',
    },
    {
        id: randomBytes(),
        duration: 60,
        date: new Date(),
        provider: providers[3],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'biontech',
    },
    {
        id: randomBytes(),
        duration: 60,
        date: new Date(),
        provider: providers[1],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'biontech',
    },
    {
        id: randomBytes(),
        duration: 60,
        date: new Date(),
        provider: providers[1],
        slots: createSlots(10),
        bookings: [],
        vaccine: 'mrna',
    },
];

// export const providers: any[] = [
//     {
//         id: '1',
//         name: 'Impfzentrum 3000',
//         street: 'Münchener Straße 42',
//         zipCode: 30313,
//         city: 'Frankfurt',
//         verified: true,
//     },
// ];
