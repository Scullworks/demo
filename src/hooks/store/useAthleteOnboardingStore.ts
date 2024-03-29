import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { AthleteMembershipType, PositionPreference } from '@/models';

interface AthleteOnboardingState {
    readonly dateOfBirth: Dayjs | null;
    readonly emergencyName: string | null;
    readonly emergencyNumber: string | null;
    readonly club: string | null;
    readonly membershipType: AthleteMembershipType | null;
    readonly positionPreference: PositionPreference | null;
}

interface AthleteOnboardingActions {
    readonly setDateOfBirth: (dateOfBirth: Dayjs) => void;
    readonly setEmergencyName: (emergencyName: string) => void;
    readonly setEmergencyNumber: (emergencyNumber: string) => void;
    readonly setClub: (club: string) => void;
    readonly setMembershipType: (membershipType: AthleteMembershipType) => void;
    readonly setPositionPreference: (positionPreference: PositionPreference) => void;
    readonly reset: () => void;
}

const initialState: AthleteOnboardingState = {
    dateOfBirth: null,
    emergencyName: null,
    emergencyNumber: null,
    club: null,
    membershipType: null,
    positionPreference: null
};

export const useAthleteOnboardingStore = create<
    AthleteOnboardingState & AthleteOnboardingActions
>()(set => ({
    ...initialState,
    setDateOfBirth: dateOfBirth => set(() => ({ dateOfBirth })),
    setEmergencyName: emergencyName => set(() => ({ emergencyName })),
    setEmergencyNumber: emergencyNumber => set(() => ({ emergencyNumber })),
    setClub: club => set(() => ({ club })),
    setMembershipType: membershipType => set(() => ({ membershipType })),
    setPositionPreference: positionPreference => set(() => ({ positionPreference })),
    reset: () => set(initialState)
}));
