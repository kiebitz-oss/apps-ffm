import { ArrowLeft16 } from '@carbon/icons-react';
import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps } from 'ui';

export const BackLink: React.FC<LinkProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <Link
            className={clsx(
                'hidden md:inline-flex md:absolute md:top-10 md:left-4 md:gap-8 md:book',
                className
            )}
            {...props}
        >
            <ArrowLeft16 /> {children}
        </Link>
    );
};
