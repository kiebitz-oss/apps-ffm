import { writable } from "svelte/store";

export enum NotificationType {
  WARNING = "warning",
  INFO = "info",
  DANGER = "danger",
  SUCCESS = "success",
}

export const notifications = writable<{
  message: string;
  type: NotificationType;
} | null>();

export const addNotification = (
  message: string,
  type: NotificationType = NotificationType.INFO
) => {
  notifications.set({ message, type });
};
