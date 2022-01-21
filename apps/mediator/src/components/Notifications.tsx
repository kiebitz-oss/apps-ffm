import { useAppState } from "lib/AppProvider";

export const Notifications: React.FC = () => {
  const { notifications } = useAppState();

  return notifications ? (
    <ul>
      {notifications.map((notification) => (
        <li key={notification.message}>{notification.message}</li>
      ))}
    </ul>
  ) : null;
};
