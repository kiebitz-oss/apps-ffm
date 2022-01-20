import clsx from "clsx";
import { MessageVariant } from "./types";

interface MessageProps {
  className?: string;
  waiting?: boolean;
  variant?: MessageVariant;
}

export const Message: React.FC<MessageProps> = ({
  children,
  className,
  variant,
}) => <div className={clsx("message", variant, className)}>{children}</div>;
