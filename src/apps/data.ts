import type { Appointment, PublicProvider } from 'types';

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
        id: '1',
        duration: 15,
        date: new Date(),
        provider: providers[0],
        slots: [],
    },
    {
        id: '2',
        duration: 15,
        date: new Date(),
        provider: providers[1],
        slots: [],
    },
    {
        id: '3',
        duration: 15,
        date: new Date(),
        provider: providers[2],
        slots: [],
    },
    {
        id: '4',
        duration: 15,
        date: new Date(),
        provider: providers[3],
        slots: [],
    },
    {
        id: '5',
        duration: 15,
        date: new Date(),
        provider: providers[1],
        slots: [],
    },
    {
        id: '6',
        duration: 15,
        date: new Date(),
        provider: providers[1],
        slots: [],
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
