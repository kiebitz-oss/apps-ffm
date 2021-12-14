// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

export const randomBytes = (length = 32) => {
    const uint8Array = new Uint8Array(length);

    (window.crypto || crypto).getRandomValues(uint8Array);

    return Buffer.from(uint8Array).toString('base64');
};
