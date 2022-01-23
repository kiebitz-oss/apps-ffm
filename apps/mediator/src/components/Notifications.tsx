import { useNotifications } from "stores/notifications";

export const Notifications: React.FC = () => {
  const notifications = useNotifications((state) => state.notifications);

  return notifications ? (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.message}>{notification.message}</li>
      ))}
    </ul>
  ) : null;
};
