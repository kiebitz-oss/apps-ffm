import clsx from "clsx";

export type FormProps = React.ComponentProps<"form">;

export const Form: React.FC<FormProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form className={clsx("form", className)} {...props}>
      {children}
    </form>
  );
};
