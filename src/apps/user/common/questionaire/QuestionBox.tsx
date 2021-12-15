import clsx from 'clsx';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Error } from 'ui';

type QuestionBoxProps = {
    name: string;
    control: Control;
    error?: boolean;
    errorMessage?: string;
};

export const QuestionBox: React.FC<QuestionBoxProps> = ({
    children,
    control,
    name,
    error,
    errorMessage = 'Ihre letzte Impfung muss mehr. Bitte haben Sie Verständnis für die aktuellen Regeln. Diese können sich ändern, bleiben Sie informiert.',
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
                return (
                    <>
                        <div
                            className={clsx('question-box', {
                                ['error']: error,
                            })}
                        >
                            <div className="question">
                                <h3>{children}</h3>
                                <div>?</div>
                            </div>

                            <div className="answer">
                                <label htmlFor={`${name}-yes`}>
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

                                <label htmlFor={`${name}-no`}>
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
                        {error && <Error>{errorMessage}</Error>}
                    </>
                );
            }}
        />
    );
};
