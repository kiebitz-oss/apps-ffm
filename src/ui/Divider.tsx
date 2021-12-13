import clsx from 'clsx';
import React from 'react';

type DividerProps = React.ComponentProps<'hr'>;

export const Divider: React.FC<DividerProps> = ({ className }) => (
    <hr className={clsx('border-t border-gray-200', className)} />
);
