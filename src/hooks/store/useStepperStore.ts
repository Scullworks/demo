import { create } from 'zustand';

interface StepperState {
    readonly activeStep: number;
    readonly previousStep: () => void;
    readonly nextStep: () => void;
}

export const useStepperStore = create<StepperState>()(set => ({
    activeStep: 0,
    previousStep: () => set(state => ({ activeStep: state.activeStep - 1 })),
    nextStep: () => set(state => ({ activeStep: state.activeStep + 1 }))
}));
