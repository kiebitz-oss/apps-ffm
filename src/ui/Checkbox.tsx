import clsx from 'clsx';
import React, { forwardRef } from 'react';

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, ...props }, ref) => {
        const id = !props.id ? props.name : props.id;

        return (
            <input
                id={id}
                className={clsx('checkbox', className)}
                type="checkbox"
                {...props}
                ref={ref}
            />
        );
    }
);

Checkbox.displayName = 'Checkbox';
