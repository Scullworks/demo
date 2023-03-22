import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingState {
    readonly imageUrl: string | null;
    readonly name: string | null;
    readonly email: string | null;
    readonly phoneNumber: number | null;
    readonly setImageUrl: (imageUrl: string) => void;
    readonly setName: (name: string) => void;
    readonly setEmail: (email: string) => void;
    readonly setPhoneNumber: (phoneNumber: number) => void;
}

export const useClubOnboardingStore = create<OnboardingState>()(
    persist(
        set => ({
            imageUrl: null,
            name: null,
            email: null,
            phoneNumber: null,
            setImageUrl: imageUrl => set(() => ({ imageUrl })),
            setName: name => set(() => ({ name })),
            setEmail: email => set(() => ({ email })),
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber }))
        }),
        { name: 'onboarding' }
    )
);
