import { create } from 'zustand';

interface StepperState {
    readonly activeStep: number;
    readonly triggerSubmit: boolean;
    readonly previousStep: () => void;
    readonly nextStep: () => void;
    readonly setActiveStep: (activeStep: number) => void;
    readonly setTriggerSubmit: (triggerSubmit: boolean) => void;
}

export const useStepperStore = create<StepperState>()(set => ({
    activeStep: 0,
    triggerSubmit: false,
    previousStep: () => set(state => ({ activeStep: state.activeStep - 1 })),
    nextStep: () => set(state => ({ activeStep: state.activeStep + 1 })),
    setActiveStep: activeStep => set(() => ({ activeStep })),
    setTriggerSubmit: triggerSubmit => set(() => ({ triggerSubmit }))
}));
