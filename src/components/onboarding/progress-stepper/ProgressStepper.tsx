import DefaultStepper from './DefaultStepper';
import MobileStepper from './MobileStepper';
import { useProgressStepper } from './useProgressStepper';

function ProgressStepper() {
    const { isMobileRef } = useProgressStepper();

    const isMobile = isMobileRef.current;

    return <div className="stepper">{isMobile ? <MobileStepper /> : <DefaultStepper />}</div>;
}

export default ProgressStepper;
