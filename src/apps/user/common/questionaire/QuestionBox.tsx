import React from 'react';
import { Control, Controller } from 'react-hook-form';

type QuestionBoxProps = {
    name: string;
    control: Control;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
    children,
    control,
    name,
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
                return (
                    <div className="p-4 w-full max-w-[500px] rounded-lg shadow-lg">
                        <div className="flex justify-between mb-2">
                            <h3 className="font-semibold">{children}</h3>
                            <div>?</div>
                        </div>

                        <div className="flex gap-8 items-center ml-2">
                            <label
                                htmlFor={`${name}-yes`}
                                className="flex gap-2 items-center font-semibold"
                            >
                                <input
                                    className="radio"
                                    type="radio"
                                    id={`${name}-yes`}
                                    name={name}
                                    defaultChecked={value === true}
                                    onChange={() => onChange(true)}
                                    value="1"
                                />
                                ja
                            </label>

                            <label
                                htmlFor={`${name}-no`}
                                className="flex gap-2 items-center font-semibold"
                            >
                                <input
                                    className="radio"
                                    type="radio"
                                    id={`${name}-no`}
                                    name={name}
                                    defaultChecked={value === false}
                                    onChange={() => onChange(false)}
                                    value="0"
                                />
                                nein
                            </label>
                        </div>
                    </div>
                );
            }}
        />
    );
};
