import { t } from "@lingui/macro";
import clsx from "clsx";
import React from "react";

export interface HamburgerProps extends React.ComponentProps<"button"> {
  open?: boolean;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  className,
  open,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex p-2 w-10 h-12 cursor-pointer touch-manipulation select-none stroke-primary stroke-[7px]",
        className
      )}
      title={t({
        id: "common.menu.button",
        message: "Menü öffnen",
      })}
      aria-label={
        open
          ? t({
              id: "common.menu.button.open",
              message: "geöffnet",
            })
          : t({
              id: "common.menu.button.closed",
              message: "geschlossen",
            })
      }
      {...props}
    >
      <svg
        viewBox="0 0 50 40"
        role="presentation"
        focusable="false"
        aria-hidden
      >
        <line x1="0" x2="100%" y1="10%" y2="10%" />
        <line x1="0" x2="100%" y1="50%" y2="50%" />
        <line x1="0" x2="100%" y1="90%" y2="90%" />
      </svg>
    </button>
  );
};
