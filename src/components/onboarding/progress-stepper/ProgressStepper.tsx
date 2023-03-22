import { Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthStore, useStepperStore } from '@/hooks/store';

const athleteSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Membership' },
    { id: 4, label: 'Preferences' }
];

const clubSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Services' },
    { id: 4, label: 'Boats' }
];

const coachSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Club' }
];

interface Step {
    readonly id: number;
    readonly label: string;
}

function ProgressStepper() {
    const [steps, setSteps] = useState<Step[]>([]);

    const userType = useAuthStore(state => state.userType);
    const activeStep = useStepperStore(state => state.activeStep);
    const previousStep = useStepperStore(state => state.previousStep);
    const nextStep = useStepperStore(state => state.nextStep);

    function onBackClick() {
        previousStep();
        // TODO: Implement routing
    }

    function onNextClick() {
        nextStep();
        // TODO: Implement routing
    }

    useEffect(() => {
        if (userType === 'athlete') setSteps(athleteSteps);
        if (userType === 'club') setSteps(clubSteps);
        if (userType === 'coach') setSteps(coachSteps);
    }, [userType]);

    return (
        <div className="stepper">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(step => (
                    <Step key={step.id}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="stepper-button__container">
                <button
                    className="stepper-button"
                    onClick={onBackClick}
                    disabled={activeStep === 0}
                >
                    Back
                </button>
                <button className="stepper-button" onClick={onNextClick}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
}

export default ProgressStepper;
