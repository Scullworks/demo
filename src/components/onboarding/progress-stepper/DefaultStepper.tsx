import { Step as MuiStep, StepLabel, Stepper } from '@mui/material';
import { useProgressStepper } from './useProgressStepper';

function DefaultStepper() {
    const { steps, activeStep, onBackClick, onNextClick } = useProgressStepper();

    return (
        <>
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
        </>
    );
}

export default DefaultStepper;
