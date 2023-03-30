import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthStore, useStepperStore } from '@/hooks/store';
import { Step, athleteSteps, clubSteps, coachSteps } from './steps';

export function useProgressStepper() {
    const [steps, setSteps] = useState<Step[]>([]);
    const [isShortMobile, setIsShortMobile] = useState(false);

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

    useEffect(() => {
        function checkWindowHeight() {
            if (window.innerHeight <= 700) {
                setIsShortMobile(true);
            } else {
                setIsShortMobile(false);
            }
        }

        window.addEventListener('resize', checkWindowHeight);

        return () => {
            window.removeEventListener('resize', checkWindowHeight);
        };
    }, []);

    return {
        isShortMobile,
        steps,
        activeStep,
        onBackClick,
        onNextClick
    };
}
