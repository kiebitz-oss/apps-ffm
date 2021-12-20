// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export interface MediatorKeyPairs {
  encryptions: JsonWebKey;
  provider: JsonWebKey;
  queue: JsonWebKey;
  signing: JsonWebKey;
}
