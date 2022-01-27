import { ArrowLeft16 } from "@carbon/icons-react";
import clsx from "clsx";
import { Link, LinkProps } from "./Link";

export const BackLink: React.FC<LinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      className={clsx(
        "hidden md:inline-flex md:gap-4 md:mb-4 md:-ml-8 md:book",
        className
      )}
      {...props}
    >
      <ArrowLeft16 /> {children}
    </Link>
  );
};
