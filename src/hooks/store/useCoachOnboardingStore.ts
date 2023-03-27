import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CoachMembership = 'Coach' | 'Guest Coach';

interface CoachOnboardingState {
    readonly phoneNumber: number | null;
    readonly club: string | null;
    readonly membership: CoachMembership | null;
    readonly setPhoneNumber: (phoneNumber: number) => void;
    readonly setClub: (club: string) => void;
    readonly setMembership: (membership: CoachMembership) => void;
}

export const useCoachOnboardingStore = create<CoachOnboardingState>()(
    persist(
        set => ({
            phoneNumber: null,
            club: null,
            membership: null,
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
            setClub: club => set(() => ({ club })),
            setMembership: membership => set(() => ({ membership }))
        }),
        { name: 'coach-onboarding' }
    )
);
