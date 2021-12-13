import { Edit24 } from '@carbon/icons-react';
import { t, Trans } from '@lingui/macro';
import React, { ChangeEventHandler } from 'react';
import { Button, InputField, Link, Title } from 'ui';
import { Types, useFinderState } from './FinderStateProvider';

const SlotCard: React.FC = () => {
    return (
        <Link
            href="/user/finder/verify"
            className="group flex-grow p-4 -mx-4 text-center no-underline rounded-md border shadow-lg hover:shadow-2xl focus:shadow-2xl sm:mx-0"
        >
            <address className="mb-2 text-center">
                <Title variant="h3">Impfzentrum FFM</Title>
                <span className="font-medium">
                    Ludwig-Erhard-Anlage 1,
                    <br />
                    60327 Frankfurt am Main
                </span>
            </address>

            <time className="block mb-6 text-center">
                <span className="text-4xl font-semibold">15:23 Uhr</span>
                <br />
                <span className="text-xl font-semibold">am 19.12.21</span>
            </time>

            <p className="mb-6">Impfstoff: BioNTech/Pfizer</p>

            <Button
                className="group-hover:bg-blue-700 group-focus:bg-blue-700 shadow-lg select-none"
                tabIndex={-1}
            >
                <Trans id="user.finder.slot.card.submit">
                    Termin auswählen
                </Trans>
            </Button>
        </Link>
    );
};

export const SlotStep: React.FC = () => {
    const { dispatch, state } = useFinderState();

    const onDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const date = event.currentTarget.valueAsDate;

        dispatch({
            type: Types.SET_DATE,
            payload: { date: date || new Date() },
        });
    };

    return (
        <main>
            <Title variant="h1" as="h2">
                <Trans id="user.finder.slot.title">Termine</Trans>
            </Title>

            <div className="flex flex-col gap-6 items-stretch mb-8 w-full md:flex-row md:justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <InputField
                        name="provider"
                        type="search"
                        placeholder={t({
                            id: 'user.finder.slot.provider.placeholder',
                            message: 'Beliebige Impfstelle',
                        })}
                        value={state.provider?.name}
                    />
                    <Link
                        href="/user/finder/location"
                        className="inline-flex justify-center items-center w-10 h-10 text-white no-underline bg-primary-500 rounded-lg shadow"
                    >
                        <Edit24 />
                    </Link>
                </div>
                <InputField
                    name="date"
                    type="datetime-local"
                    placeholder={t({
                        id: 'user.finder.slot.time.placeholder',
                        message: 'Beliebige Zeit',
                    })}
                    onChange={onDateChange}
                    defaultValue={state.date.toISOString().substring(0, 16)}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
                <SlotCard />
            </div>

            <button className="py-2 px-6 my-8 mx-auto text-lg font-semibold bg-gray-300 rounded-lg shadow-lg">
                <Trans id="user.finder.slot.submit">
                    Weitere Termine laden
                </Trans>
            </button>
        </main>
    );
};
