// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import {
  Backend,
  InMemoryStorage,
  JSONRPCBackend,
  RESTBackend,
  Settings,
  StorageStore,
} from "vanellus";

export const settingsPath = process.env.KIEBITZ_SETTINGS || "test_backend/keys";
export const appointmentsPort =
  process.env.KIEBITZ_APPOINTMENTS_PORT || "22222";
export const storagePort = process.env.KIEBITZ_STORAGE_PORT || "11111";

export const settingsJSONRPC: Settings = {
  appointment: {
    properties: {},
  },
  apiUrls: {
    appointments: `http://127.0.0.1:${appointmentsPort}/jsonrpc`,
    storage: `http://127.0.0.1:${storagePort}/jsonrpc`,
  },
};

export const settingsREST: Settings = {
  appointment: {
    properties: {},
  },
  apiUrls: {
    appointments: `http://127.0.0.1:${appointmentsPort}/`,
    storage: `http://127.0.0.1:${storagePort}/`,
  },
};

export const getBackendInstance = (): Backend => {
  const settings: Settings = {
    appointment: {
      properties: {},
    },
    apiUrls: {
      storage:
        process.env.NEXT_PUBLIC_STORAGE_ENDPOINT ||
        "https://storage.kiebitz.eu/jsonrpc",
      appointments:
        process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT ||
        "https://appointments.kiebitz.eu/jsonrpc",
    },
  };
  const store = new StorageStore(new InMemoryStorage());
  const temporaryStore = new StorageStore(new InMemoryStorage());

  let appointmentsNetworkBackend;
  let storageNetworkBackend;

  if (process.env.KIEBITZ_USE_REST === "true") {
    appointmentsNetworkBackend = new RESTBackend(
      settingsREST.apiUrls.appointments
    );
    storageNetworkBackend = new RESTBackend(settingsREST.apiUrls.storage);
  } else {
    appointmentsNetworkBackend = new JSONRPCBackend(
      settingsJSONRPC.apiUrls.appointments
    );
    storageNetworkBackend = new JSONRPCBackend(settingsJSONRPC.apiUrls.storage);
  }

  return new Backend(
    store,
    temporaryStore,
    appointmentsNetworkBackend,
    storageNetworkBackend
  );
};
