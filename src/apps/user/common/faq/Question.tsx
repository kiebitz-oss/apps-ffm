import React from 'react';

interface QuestionProps extends React.ComponentProps<'details'> {
    question: string;
}

export const Question: React.FC<QuestionProps> = ({
    children,
    question,
    ...props
}) => {
    return (
        <details {...props}>
            <summary>
                <h4>{question}</h4>
            </summary>

            <p>{children}</p>
        </details>
    );
};
