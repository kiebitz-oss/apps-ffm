// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import RouterLink from "next/link";

export interface LinkProps extends React.ComponentProps<"a"> {
  external?: boolean;
  type?: "link" | "button";
  href: string;
  locale?: string;
  variant?: string;
  size?: string;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  className,
  type,
  external,
  rel,
  target,
  locale,
  variant,
  size = "md",
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
    <RouterLink href={href}>
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
        lang={locale}
        {...props}
      >
        {children}
      </a>
    </RouterLink>
  );
};
