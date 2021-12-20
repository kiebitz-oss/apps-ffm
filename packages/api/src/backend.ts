import { Backend, InMemoryStorage, Settings, StorageStore } from "vanellus";

if (!process.env.NEXT_PUBLIC_STORAGE_ENDPOINT) {
  throw new Error("process.env.STORAGE_ENDPOINT not set.");
}

if (!process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT) {
  throw new Error("process.env.APPOINTMENT_ENDPOINT not set.");
}

const settings: Settings = {
  appointment: {
    properties: {},
  },
  apiUrls: {
    storage: process.env.NEXT_PUBLIC_STORAGE_ENDPOINT,
    appointments: process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT,
  },
};
const store = new StorageStore(new InMemoryStorage());
const temporaryStore = new StorageStore(new InMemoryStorage());

export const backend = new Backend(settings, store, temporaryStore);
