// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import { Backend, InMemoryStorage, Settings, StorageStore } from "vanellus";

export const getBackendInstance = (): Backend => {
  if (!process.env.NEXT_PUBLIC_STORAGE_ENDPOINT) {
    throw new Error("process.env.NEXT_PUBLIC_STORAGE_ENDPOINT not set.");
  }

  if (!process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT) {
    throw new Error("process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT not set.");
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

  return new Backend(settings, store, temporaryStore);
};
