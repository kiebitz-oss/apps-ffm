import React from 'react';
import { useParams } from 'react-router';
import { Wizard } from 'ui';
import { DataStep } from './DataStep';
import { OnboardingProvider } from './OnboardingProvider';
import { SecretStep } from './SecretStep';
import { VerifyStep } from './VerifyStep';

const OnboardingPage: React.FC = () => {
    const { step } = useParams();

    return (
        <OnboardingProvider>
            <Wizard step={step || 'data'}>
                <DataStep />
                <SecretStep />
                <VerifyStep />
            </Wizard>
        </OnboardingProvider>
    );
};

export default OnboardingPage;
