import clsx from "clsx";
import type { Size } from "./types";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "tertiary" | "invalid";
  size?: Size;
  waiting?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  variant = "primary",
  size = "md",
  waiting = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "button",
        variant,
        size,
        { ["waiting"]: waiting },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
