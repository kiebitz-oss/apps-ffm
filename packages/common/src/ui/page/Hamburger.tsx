import clsx from "clsx";
import React from "react";

export interface HamburgerProps {
  className?: string;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  className,
  ...props
}) => {
  return (
    <a
      className={clsx(
        "flex p-2 w-10 h-12 cursor-pointer touch-manipulation select-none stroke-primary stroke-[7px]",
        className
      )}
      title="Open Menu"
      aria-label="Open Menu"
      {...props}
    >
      <svg
        viewBox="0 0 50 40"
        role="presentation"
        focusable="false"
        aria-label="trigram for heaven symbol"
      >
        <line x1="0" x2="100%" y1="10%" y2="10%" />
        <line x1="0" x2="100%" y1="50%" y2="50%" />
        <line x1="0" x2="100%" y1="90%" y2="90%" />
      </svg>
    </a>
  );
};
