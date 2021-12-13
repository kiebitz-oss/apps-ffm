import clsx from 'clsx';
import React, { forwardRef } from 'react';

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        const id = !props.id ? props.name : props.id;

        return (
            <>
                <input
                    id={id}
                    className={clsx('checkbox', className)}
                    type="checkbox"
                    {...props}
                    ref={ref}
                />
                <label htmlFor={id} className="select-none">
                    {label}
                </label>
            </>
        );
    }
);

Checkbox.displayName = 'Checkbox';
