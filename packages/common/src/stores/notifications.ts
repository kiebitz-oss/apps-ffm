import create from "zustand";

export enum NotificationType {
  SUCCESS = "SUCCESS",
  INFO = "INFO",
  WARNING = "WARNING",
  DANGER = "DANGER",
}

type Notification = {
  id: number;
  message: string;
  type: NotificationType;
  duration: number;
  persistant: boolean;
};

type NotificationState = {
  notifications: Notification[];
};

export const useNotifications = create<NotificationState>(() => ({
  notifications: [],
}));

export const addNotification = (
  message: string,
  type: NotificationType = NotificationType.INFO,
  duration = 5,
  persistant = false
) => {
  const notification: Notification = {
    id: Math.round(Math.random() * 1000),
    message,
    type,
    persistant,
    duration,
  };

  return useNotifications.setState((state) => ({
    notifications: [...state.notifications, notification],
  }));
};

export const pullNotification = () => {
  const state = useNotifications.getState();

  if (state.notifications.length) {
    const notification = state.notifications[0];

    useNotifications.setState((state) => ({
      notifications: [...state.notifications.slice(1)],
    }));

    return notification;
  }

  return null;
};

export const removeNotification = (id: number) => {
  const notification = useNotifications
    .getState()
    .notifications.find((notification) => notification.id === id);

  if (notification) {
    useNotifications.setState((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  }

  return notification;
};

export const resetNotifications = () =>
  useNotifications.setState(
    {
      notifications: [],
    },
    true
  );
