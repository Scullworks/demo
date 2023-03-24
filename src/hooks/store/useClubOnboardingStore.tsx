import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Service =
    | 'Sculling'
    | 'ERG Workout'
    | 'Private Coaching'
    | 'Sweep Rowing'
    | '8x8 Sweep'
    | 'Gear Rental';

export type BoatSize = '8+' | '4+' | '4-' | '4x' | '2+' | '2-' | '2x' | '1x';

export interface Boat {
    readonly size: BoatSize;
    readonly make: string;
    readonly name: string;
}

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

interface ClubOnboardingState extends OnboardingState {
    readonly openingTime: string | null;
    readonly closingTime: string | null;
    readonly cancellationPolicy: string | null;
    readonly address: string | null;
    readonly services: Service[];
    readonly boats: Boat[];
    readonly setOpeningTime: (openingTime: string) => void;
    readonly setClosingTime: (closingTime: string) => void;
    readonly setCancellationPolicy: (cancellationPolicy: string) => void;
    readonly setAddress: (address: string) => void;
    readonly updateServices: (services: Service[]) => void;
    readonly addBoat: (boat: Boat) => void;
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
            boats: [],
            boatSize: null,
            boatMake: null,
            boatName: null,
            setImageUrl: imageUrl => set(() => ({ imageUrl })),
            setName: name => set(() => ({ name })),
            setEmail: email => set(() => ({ email })),
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
            setOpeningTime: openingTime => set(() => ({ openingTime })),
            setClosingTime: closingTime => set(() => ({ closingTime })),
            setCancellationPolicy: cancellationPolicy => set(() => ({ cancellationPolicy })),
            setAddress: address => set(() => ({ address })),
            updateServices: services => set(() => ({ services })),
            addBoat: boat => set(state => ({ boats: [...state.boats, boat] }))
        }),
        { name: 'club-onboarding' }
    )
);
