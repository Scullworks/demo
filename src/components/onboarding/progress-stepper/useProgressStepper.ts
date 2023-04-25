import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore, useStepperStore } from '@/hooks/store';
import { Step, athleteSteps, clubSteps, coachSteps } from './steps';

export function useProgressStepper() {
    const [steps, setSteps] = useState<Step[]>([]);

    const userType = useAuthStore(state => state.userType);
    const activeStep = useStepperStore(state => state.activeStep);
    const previousStep = useStepperStore(state => state.previousStep);
    const setTriggerOnSubmit = useStepperStore(state => state.setTriggerSubmit);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);

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

    return {
        isMobileRef,
        steps,
        activeStep,
        onBackClick,
        onNextClick
    };
}
