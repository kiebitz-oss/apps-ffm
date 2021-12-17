import React from 'react';
import { useParams } from 'react-router';
import { Wizard } from 'ui';
import { AppointmentStep } from './AppointmentStep';
import { DateStep } from './DateStep';
import { FinderStateProvider } from './FinderStateProvider';
import { LocationStep } from './LocationStep';
import { SuccessStep } from './SuccessStep';
import { VerifyStep } from './VerifyStep';

export const FinderPage: React.FC = () => {
    const { step } = useParams();

    return (
        <FinderStateProvider>
            <Wizard step={step || 'location'}>
                <LocationStep />
                <AppointmentStep />
                <DateStep />
                <VerifyStep />
                <SuccessStep />
            </Wizard>
        </FinderStateProvider>
    );
};
