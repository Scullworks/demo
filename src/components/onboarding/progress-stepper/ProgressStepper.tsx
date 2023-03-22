import { Step as MuiStep, StepLabel, Stepper } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore, useStepperStore } from '@/hooks/store';
import { athleteSteps, clubSteps, coachSteps, Step } from './steps';

function ProgressStepper() {
    const [steps, setSteps] = useState<Step[]>([]);

    const userType = useAuthStore(state => state.userType);
    const activeStep = useStepperStore(state => state.activeStep);
    const previousStep = useStepperStore(state => state.previousStep);
    const setTriggerOnSubmit = useStepperStore(state => state.setTriggerSubmit);

    const router = useRouter();

    function onBackClick() {
        previousStep();
        router.back();
    }

    function onNextClick() {
        setTriggerOnSubmit(true);
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
                    <MuiStep key={step.id}>
                        <StepLabel>{step.label}</StepLabel>
                    </MuiStep>
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
