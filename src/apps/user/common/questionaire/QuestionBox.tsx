import React from 'react';

interface QuestionBoxProps {
    id: string;
}

export const QuestionBox: React.FC<QuestionBoxProps> = ({ children, id }) => {
    return (
        <div className="p-4 w-full max-w-[500px] rounded-lg shadow-lg">
            <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{children}</h3>
                <div>?</div>
            </div>

            <div className="flex gap-8 items-center ml-2">
                <label
                    htmlFor={`${id}-yes`}
                    className="flex gap-2 items-center font-semibold"
                >
                    <input
                        className="radio"
                        type="radio"
                        id={`${id}-yes`}
                        name={id}
                        value="1"
                    />
                    ja
                </label>

                <label
                    htmlFor={`${id}-no`}
                    className="flex gap-2 items-center font-semibold"
                >
                    <input
                        className="radio"
                        type="radio"
                        id={`${id}-no`}
                        name={id}
                        value="0"
                    />
                    nein
                </label>
            </div>
        </div>
    );
};
