import clsx from "clsx";
import {
  NotificationType,
  removeNotification,
  useNotifications,
} from "../stores/notifications";

export const Notifications: React.FC = () => {
  const notifications = useNotifications((store) => store.notifications);

  if (notifications.length <= 1) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2 pb-8">
      {notifications.map((notification) => {
        if (!notification.persistant) {
          setTimeout(() => {
            removeNotification(notification.id);
          }, notification.duration * 1000);
        }

        return (
          <li
            key={notification.id}
            className={clsx("notification", {
              ["success"]: NotificationType.SUCCESS === notification.type,
              ["info"]: NotificationType.INFO === notification.type,
              ["warning"]: NotificationType.WARNING === notification.type,
              ["danger"]: NotificationType.DANGER === notification.type,
            })}
          >
            <div>{notification.message}</div>
            <button onClick={() => removeNotification(notification.id)}>
              x
            </button>
          </li>
        );
      })}
    </ul>
  );
};
