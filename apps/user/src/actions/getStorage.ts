import { VanellusStorage } from "vanellus";

let storage: VanellusStorage;

export const getStorage = () => {
  if (!storage) {
    storage = new VanellusStorage("user");
  }

  return storage;
};
