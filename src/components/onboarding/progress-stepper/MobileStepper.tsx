import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper as MuiMobileStepper } from '@mui/material';
import { useProgressStepper } from './useProgressStepper';

function MobileStepper() {
    const { steps, activeStep, onBackClick, onNextClick } = useProgressStepper();

    return (
        <MuiMobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            backButton={
                <Button size="small" onClick={onBackClick} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
            nextButton={
                <Button size="small" onClick={onNextClick} sx={{ width: '8rem' }}>
                    {activeStep === steps.length - 1 ? 'Finish' : '  Next'}
                    <KeyboardArrowRight />
                </Button>
            }
        />
    );
}

export default MobileStepper;
