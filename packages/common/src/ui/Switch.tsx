import clsx from "clsx";
import { forwardRef } from "react";

export interface SwitchProps extends React.ComponentProps<"input"> {
  defaultChecked?: boolean;
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <>
        <input
          type="checkbox"
          role="switch"
          className={clsx("switch", className)}
          {...props}
          ref={ref}
        />
        <span className="select-none">{label}</span>
      </>
    );
  }
);

Switch.displayName = "Switch";
