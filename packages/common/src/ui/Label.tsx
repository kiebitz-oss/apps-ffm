import clsx from "clsx";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  id,
  className,
  required,
  ...props
}) => {
  return (
    <label className={clsx("label", className)} htmlFor={id} {...props}>
      {children} {required ? "*" : null}
    </label>
  );
};
