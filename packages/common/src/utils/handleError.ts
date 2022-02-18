// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon

import { browser, dev } from "$app/env";

// https://w3c.github.io/beacon/#sendbeacon-method
export const handleErrors = (event) => {
  try {
    const { message, filename, lineno, colno, error } = event;
    const body = { message, filename, lineno, colno, error };
    const beaconUrl = import.meta.env.VITE_IMPFEN_BEACON_ENDPOINT as string;

    if (browser && beaconUrl) {
      if (dev) {
        console.log("[beacon]", JSON.stringify(body, null, 2));
      }

      const blob = new Blob([JSON.stringify(body)], {
        // This content type is necessary for `sendBeacon`:
        type: "application/x-www-form-urlencoded",
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(beaconUrl, blob);
      } else
        fetch(beaconUrl, {
          body: blob,
          method: "POST",
          credentials: "omit",
          keepalive: true,
        });
    }
  } catch (error) {
    console.error(error);
  }
};
