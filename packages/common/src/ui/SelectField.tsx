import { forwardRef } from "react";
import { Field, FieldProps } from "./Field";
import { Select, SelectProps } from "./Select";

export interface SelectFieldProps extends SelectProps, FieldProps {
  name: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, description, className, required, ...props }, ref) => {
    const id = !props.id ? name : props.id;

    return (
      <Field
        id={id}
        name={name}
        description={description}
        label={label}
        className={className}
        required={required}
      >
        <Select id={id} name={name} ref={ref} required={required} {...props} />
      </Field>
    );
  }
);

SelectField.displayName = "SelectField";
