import { create } from 'zustand';

interface AnimationState {
    readonly isInitialLoad: boolean;
    readonly headerBenefitsIsInView: boolean;
    readonly setIsInitialLoad: (value: boolean) => void;
    readonly setHeaderBenefitsIsInView: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationState>()(set => ({
    isInitialLoad: true,
    headerBenefitsIsInView: false,
    setIsInitialLoad: isInitialLoad => set({ isInitialLoad }),
    setHeaderBenefitsIsInView: isInView => set(() => ({ headerBenefitsIsInView: isInView }))
}));
