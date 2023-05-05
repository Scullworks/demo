import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAuthStore, useStepperStore } from '@/hooks/store';
import { Step, athleteSteps, clubSteps, coachSteps } from './steps';

export function useProgressStepper() {
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

    let steps: Step[] = [];

    if (userType === 'athlete') steps = athleteSteps;
    if (userType === 'club') steps = clubSteps;
    if (userType === 'coach') steps = coachSteps;

    return {
        isMobileRef,
        steps,
        activeStep,
        onBackClick,
        onNextClick
    };
}
