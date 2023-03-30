import DefaultStepper from './DefaultStepper';
import MobileStepper from './MobileStepper';
import { useProgressStepper } from './useProgressStepper';

function ProgressStepper() {
    const { isShortMobile } = useProgressStepper();

    return <div className="stepper">{isShortMobile ? <MobileStepper /> : <DefaultStepper />}</div>;
}

export default ProgressStepper;
