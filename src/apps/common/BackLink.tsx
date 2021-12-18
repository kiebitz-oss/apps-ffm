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
                'hidden top-10 left-4 gap-8 hover:text-primary no-underline md:inline-flex backabsolute book',
                className
            )}
            {...props}
        >
            <ArrowLeft16 /> {children}
        </Link>
    );
};
