import create from "zustand";

type Notification = {
  id: number;
  message: string;
  type?: "INFO";
  shown?: boolean;
};

type NotificationState = {
  notifications: Notification[];
};

export const useNotifications = create<NotificationState>(() => ({
  notifications: [],
}));

export const addNotification = (
  messageOrNotification: string | Notification
) => {
  const notification: Notification =
    typeof messageOrNotification === "string"
      ? {
          id: 23,
          message: messageOrNotification,
          type: "INFO",
          shown: false,
        }
      : messageOrNotification;

  return useNotifications.setState({
    notifications: [...useNotifications.getState().notifications, notification],
  });
};
