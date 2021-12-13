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
        <Link className={clsx('back-link', className)} {...props}>
            <ArrowLeft16 /> {children}
        </Link>
    );
};
