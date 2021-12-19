// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.

import clsx from "clsx";
import RouterLink from "next/link";
import { loadLocale, useI18n } from "./useI18n";

export interface LinkProps extends React.ComponentProps<"a"> {
  external?: boolean;
  type?: "link" | "button";
  href: string;
  locale?: string;
  variant?: string;
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
  ...props
}) => {
  const i18n = useI18n();

  if (!href || external) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        className={clsx(
          {
            ["button"]: type === "button",
            ["link"]: !type,
          },
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
          className
        )}
        rel={rel}
        target={target}
        onClick={() => loadLocale(i18n, locale)}
        {...props}
      >
        {children}
      </a>
    </RouterLink>
  );
};
