import type { Writable } from "svelte/store";
import { get, writable as internal } from "svelte/store";

declare type Updater<T> = (value: T) => T;
declare type StoreDict<T> = Record<string, Writable<T>>;

const stores: StoreDict<unknown> = {};

export function persistantWriteable<T>(
  key: string,
  initialValue?: T,
  session = false
): Writable<T> {
  const browser = session
    ? typeof sessionStorage != "undefined"
    : typeof localStorage != "undefined";

  function updateStorage(key: string, value: T) {
    if (!browser) {
      return;
    }

    (session ? sessionStorage : localStorage).setItem(
      key,
      JSON.stringify(value)
    );
  }

  if (!stores[key]) {
    const store = internal(initialValue, (set) => {
      const json = browser
        ? (session ? sessionStorage : localStorage).getItem(key)
        : null;

      if (json) {
        try {
          set(<T>JSON.parse(json));
        } catch (error) {
          // console.error(error);
          set(initialValue);
        }
      }

      if (browser) {
        const handleStorage = (event: StorageEvent) => {
          if (event.key === key)
            try {
              set(event.newValue ? (JSON.parse(event.newValue) as T) : null);
            } catch (error) {
              // console.error(error);
              set(initialValue);
            }
        };

        window.addEventListener("storage", handleStorage);

        return () => window.removeEventListener("storage", handleStorage);
      }
    });

    const { subscribe, set } = store;

    stores[key] = {
      set(value: T) {
        updateStorage(key, value);
        set(value);
      },
      update(updater: Updater<T>) {
        const value = updater(get(store));

        updateStorage(key, value);
        set(value);
      },
      subscribe,
    };
  }

  return stores[key] as Writable<T>;
}
