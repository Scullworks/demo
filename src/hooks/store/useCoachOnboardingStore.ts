import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CoachMembershipType = 'Coach' | 'Guest Coach';

interface CoachOnboardingState {
    readonly phoneNumber: number | null;
    readonly club: string | null;
    readonly membershipType: CoachMembershipType | null;
    readonly setPhoneNumber: (phoneNumber: number) => void;
    readonly setClub: (club: string) => void;
    readonly setMembershipType: (membershipType: CoachMembershipType) => void;
}

export const useCoachOnboardingStore = create<CoachOnboardingState>()(
    persist(
        set => ({
            phoneNumber: null,
            club: null,
            membershipType: null,
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
            setClub: club => set(() => ({ club })),
            setMembershipType: membershipType => set(() => ({ membershipType }))
        }),
        { name: 'coach-onboarding' }
    )
);
