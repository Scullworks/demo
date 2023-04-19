import DefaultStepper from './DefaultStepper';
import MobileStepper from './MobileStepper';
import { useProgressStepper } from './useProgressStepper';

function ProgressStepper() {
    const { isMobile } = useProgressStepper();

    return <div className="stepper">{isMobile ? <MobileStepper /> : <DefaultStepper />}</div>;
}

export default ProgressStepper;
