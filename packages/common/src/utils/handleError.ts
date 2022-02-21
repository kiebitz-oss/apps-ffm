// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon

import { browser, dev } from "$app/env";

// https://w3c.github.io/beacon/#sendbeacon-method
export const handleErrors = (event) => {
  try {
    const beaconUrl = import.meta.env.VITE_IMPFEN_BEACON_ENDPOINT as string;

    if (browser && beaconUrl) {
      const body = {
        message: `${
          event.reason?.message ? event.reason.message : event.message
        }`,
        filename: `${
          event.reason?.filename ? event.reason.filename : event.filename
        }`,
        lineno: `${event.reason?.lineno ? event.reason.lineno : event.lineno}`,
        colno: `${event.reason?.colno ? event.reason.colno : event.colno}`,
        error: `${event.error}`,
        reason: `${event.reason}`,
        stack: `${event.reason?.stack}`,
      };

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
