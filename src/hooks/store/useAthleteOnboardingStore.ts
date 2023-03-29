import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AthleteMembershipType = 'Member' | 'Guest Rower' | 'Gear Rental Only';
export type PositionPreference = 'Port' | 'Biswpetual' | 'Starboard';

interface AthleteOnboardingState {
    readonly phoneNumber: number | null;
    readonly dateOfBirth: Dayjs | null;
    readonly emergencyName: string | null;
    readonly emergencyNumber: number | null;
    readonly club: string | null;
    readonly membershipType: AthleteMembershipType | null;
    readonly positionPreference: PositionPreference | null;
    readonly setPhoneNumber: (phoneNumber: number) => void;
    readonly setDateOfBirth: (dateOfBirth: Dayjs) => void;
    readonly setEmergencyName: (emergencyName: string) => void;
    readonly setEmergencyNumber: (emergencyNumber: number) => void;
    readonly setClub: (club: string) => void;
    readonly setMembershipType: (membershipType: AthleteMembershipType) => void;
    readonly setPositionPreference: (positionPreference: PositionPreference) => void;
}

export const useAthleteOnboardingStore = create<AthleteOnboardingState>()(
    persist(
        set => ({
            phoneNumber: null,
            dateOfBirth: null,
            emergencyName: null,
            emergencyNumber: null,
            club: null,
            membershipType: null,
            positionPreference: null,
            setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
            setDateOfBirth: dateOfBirth => set(() => ({ dateOfBirth })),
            setEmergencyName: emergencyName => set(() => ({ emergencyName })),
            setEmergencyNumber: emergencyNumber => set(() => ({ emergencyNumber })),
            setClub: club => set(() => ({ club })),
            setMembershipType: membershipType => set(() => ({ membershipType })),
            setPositionPreference: positionPreference => set(() => ({ positionPreference }))
        }),
        { name: 'athlete-onboarding' }
    )
);
