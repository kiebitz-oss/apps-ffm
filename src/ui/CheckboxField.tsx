import React, { forwardRef } from 'react';
import { Field, FieldProps } from './Field';
import { Checkbox, CheckboxProps } from './Checkbox';
import clsx from 'clsx';

export interface CheckboxFieldProps extends CheckboxProps, FieldProps {
    name: string;
    label?: string;
    description?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
    ({ name, label, description, className, required, ...props }, ref) => {
        const id = !props.id ? name : props.id;

        return (
            <Field
                id={id}
                name={name}
                description={description}
                required={required}
                className={clsx(className)}
                inline
            >
                <Checkbox
                    id={id}
                    required={required}
                    name={name}
                    label={label}
                    {...props}
                    ref={ref}
                />
            </Field>
        );
    }
);

CheckboxField.displayName = 'InputField';
