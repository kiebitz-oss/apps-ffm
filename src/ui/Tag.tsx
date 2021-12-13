import clsx from 'clsx';
import React from 'react';

interface TagProps extends React.ComponentProps<'p'> {
    variant: 'success' | 'warning' | 'error';
}

export const Tag: React.FC<TagProps> = ({
    children,
    className,
    variant,
    ...props
}) => {
    return (
        <span className={clsx('tag', variant, className)} {...props}>
            {children}
        </span>
    );
};
