import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Service =
    | 'Sculling'
    | 'ERG Workout'
    | 'Private Coaching'
    | 'Sweep Rowing'
    | '8x8 Sweep'
    | 'Gear Rental';

export interface OnboardingState {
    readonly imageUrl: string | null;
    readonly name: string | null;
    readonly email: string | null;
    readonly phoneNumber: number | null;
    readonly services: Service[];
    readonly setImageUrl: (imageUrl: string) => void;
    readonly setName: (name: string) => void;
    readonly setEmail: (email: string) => void;
    readonly setPhoneNumber: (phoneNumber: number) => void;
    readonly updateServices: (services: Service[]) => void;
}

interface ClubOnboardingState extends OnboardingState {
    readonly openingTime: string | null;
    readonly closingTime: string | null;
    readonly cancellationPolicy: string | null;
    readonly address: string | null;
    readonly setOpeningTime: (openingTime: string) => void;
    readonly setClosingTime: (closingTime: string) => void;
    readonly setCancellationPolicy: (cancellationPolicy: string) => void;
    readonly setAddress: (address: string) => void;
}

export const useClubOnboardingStore = create<ClubOnboardingState>()(
    persist(
        set => ({
            imageUrl: null,
            name: null,
            email: null,
            phoneNumber: null,
            openingTime: null,
            closingTime: null,
            cancellationPolicy: null,
            address: null,
            services: [],
            setImageUrl: imageUrl => set(() => ({ imageUrl })),
            setName: name => set(() => ({ name })),
            setEmail: email => set(() => ({ email })),
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
            setOpeningTime: openingTime => set(() => ({ openingTime })),
            setClosingTime: closingTime => set(() => ({ closingTime })),
            setCancellationPolicy: cancellationPolicy => set(() => ({ cancellationPolicy })),
            setAddress: address => set(() => ({ address })),
            updateServices: services => set(() => ({ services }))
        }),
        { name: 'onboarding' }
    )
);
