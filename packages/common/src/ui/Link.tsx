import clsx from "clsx";
import RouterLink from "next/link";

export interface LinkProps extends React.ComponentProps<"a"> {
  href: string;
  external?: boolean;
  type?: "link" | "button";
  current?: boolean;
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
  variant,
  current,
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
            ["current"]: current === true,
          },
          variant,
          size,
          className
        )}
        rel={external && !rel ? "noreferrer" : rel}
        target={external && !target ? "_blank" : target}
        aria-current={current === true ? true : undefined}
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
            ["current"]: current === true,
          },
          variant,
          size,
          className
        )}
        rel={rel}
        target={target}
        aria-current={current === true ? true : undefined}
        {...props}
      >
        {children}
      </a>
    </RouterLink>
  );
};
