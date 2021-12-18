import React from 'react';

export interface FaqQuestionProps extends React.ComponentProps<'details'> {
    question: string;
}

export const FaqQuestion: React.FC<FaqQuestionProps> = ({
    children,
    question,
    ...props
}) => {
    return (
        <details {...props}>
            <summary className="mb-2 list-outside">
                <h4 className="inline text-lg font-semibold cursor-pointer md:text-2xl">
                    {question}
                </h4>
            </summary>

            <p>{children}</p>
        </details>
    );
};
