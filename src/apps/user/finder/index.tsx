import React from 'react';
import { useParams } from 'react-router';
import { Wizard } from 'ui';
import { AppointmentStep } from './appointmentStep';
import { DateStep } from './DateStep';
import { FinderStateProvider } from './FinderStateProvider';
import { LocationStep } from './LocationStep';
import { SuccessStep } from './SuccessStep';
import { VerifyStep } from './VerifyStep';

const FinderPage: React.FC = () => {
    const { step } = useParams();

    return (
        <FinderStateProvider>
            <Wizard step={step || 'appointment'}>
                <AppointmentStep />
                <LocationStep />
                <DateStep />
                <VerifyStep />
                <SuccessStep />
            </Wizard>
        </FinderStateProvider>
    );
};

export default FinderPage;
