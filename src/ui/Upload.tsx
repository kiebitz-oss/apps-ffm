import React, { ChangeEventHandler, forwardRef } from 'react';

interface UploadProps extends React.ComponentProps<'input'> {
    label?: string;
    onUpload?: (file: File) => void;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(
    ({ label, onUpload, ...props }, ref) => {
        const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
            const file = event.target.files?.[0];

            if (file && onUpload) {
                onUpload(file);
            }
        };

        return (
            <label className="block">
                {label && <span className="sr-only">{label}</span>}
                <input
                    type="file"
                    ref={ref}
                    onChange={onChange}
                    className="block file:py-2 file:px-4 file:mr-4 w-full file:text-sm text-sm file:font-semibold file:text-primary-700 file:bg-primary-50 hover:file:bg-primary-100 file:rounded-full file:border-0 cursor-pointer file:cursor-pointer"
                    {...props}
                />
            </label>
        );
    }
);

Upload.displayName = 'Upload';
