import React from 'react';
import { useParams } from 'react-router';
import { Wizard } from 'ui';
import { DateStep } from './DateStep';
import { FinderStateProvider } from './FinderStateProvider';
import { LocationStep } from './LocationStep';
import { SlotStep } from './SlotStep';
import { SuccessStep } from './SuccessStep';
import { VerifyStep } from './VerifyStep';

const FinderPage: React.FC = () => {
    const { step } = useParams();

    return (
        <FinderStateProvider>
            <Wizard step={step || 'slot'}>
                <SlotStep />
                <LocationStep />
                <DateStep />
                <VerifyStep />
                <SuccessStep />
            </Wizard>
        </FinderStateProvider>
    );
};

export default FinderPage;
