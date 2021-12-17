import { Backend, InMemoryStorage, Settings, StorageStore } from 'vanellus';

const settings: Settings = {
    appointment: {
        properties: {},
    },
    apiUrls: {
        storage: 'https://storage.kiebitz.eu/jsonrpc',
        appointments: 'https://appointments.kiebitz.eu/jsonrpc',
    },
};
const store = new StorageStore(new InMemoryStorage());
const temporaryStore = new StorageStore(new InMemoryStorage());

export const backend = new Backend(settings, store, temporaryStore);
