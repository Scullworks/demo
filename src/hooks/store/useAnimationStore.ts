import { create } from 'zustand';

interface AnimationState {
    readonly headerBenefitsIsInView: boolean;
    readonly setHeaderBenefitsIsInView: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationState>()(set => ({
    headerBenefitsIsInView: false,
    setHeaderBenefitsIsInView: isInView => set(() => ({ headerBenefitsIsInView: isInView }))
}));
