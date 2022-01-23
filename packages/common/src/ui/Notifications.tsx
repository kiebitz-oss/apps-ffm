enum NotificationType {
  INFO = "INFO",
}

type Notification = {
  id: number;
  message: string;
  type: NotificationType;
  persistant?: boolean;
};

export const Notifications: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      message: "Ihr Termin wurde storniert.",
      persistant: false,
      type: NotificationType.INFO,
    },
  ];

  return (
    <ul className="pb-8">
      {notifications.map((notification) => (
        <li key={notification.id} className="p-4 font-medium bg-yellow-300">
          {notification.message}
        </li>
      ))}
    </ul>
  );
};
