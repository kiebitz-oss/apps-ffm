// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import RouterLink from "next/link";
import { Size } from "types/Size";
import { Variant } from "types/Variant";

export interface LinkProps extends React.ComponentProps<"a"> {
  external?: boolean;
  variant?: Variant;
  size?: Size;
  type?: "link" | "button";
  href: string;
  locale?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  variant,
  size = "md",
  className,
  type,
  external,
  rel,
  target,
  locale,
  ...props
}) => {
  if (!href || external) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        className={clsx(
          {
            ["button"]: type === "button",
            ["link"]: !type,
          },
          variant,
          size,
          className
        )}
        rel={external && !rel ? "noreferrer" : rel}
        target={external && !target ? "_blank" : target}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink href={href} locale={locale}>
      <a
        className={clsx(
          {
            ["button"]: type === "button",
            ["link"]: !type,
          },
          variant,
          size,
          className
        )}
        rel={rel}
        target={target}
        {...props}
      >
        {children}
      </a>
    </RouterLink>
  );
};
