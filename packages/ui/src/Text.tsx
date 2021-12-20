import clsx from "clsx";

export interface TextProps extends React.ComponentProps<"p"> {
  variant?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <p className={clsx("text", variant, className)} {...props}>
      {children}
    </p>
  );
};
