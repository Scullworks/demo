import { Dayjs } from 'dayjs';
import { serverTimestamp } from 'firebase/firestore';
import { useAthleteOnboardingStore, useAuthStore, useCommonOnboardingStore } from '@/hooks/store';
import { OnboardingAthlete } from '@/models';

export function useAddAthleteData() {
    const user = useAuthStore(state => state.user);
    const name = useCommonOnboardingStore(state => state.name);
    const phoneNumber = useCommonOnboardingStore(state => state.phoneNumber);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);

    const dateOfBirth = useAthleteOnboardingStore(state => state.dateOfBirth) as Dayjs;
    const emergencyName = useAthleteOnboardingStore(state => state.emergencyName);
    const emergencyNumber = useAthleteOnboardingStore(state => state.emergencyNumber);

    // Add the rest when a user selects from the available options
    const partialAthleteData: Omit<
        OnboardingAthlete,
        'club' | 'membershipType' | 'positionPreference'
    > = {
        uid: user?.uid as string,
        name,
        email: user?.email as string,
        phoneNumber,
        dateOfBirth: dateOfBirth?.toString(),
        emergencyName,
        emergencyNumber,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    return {
        partialAthleteData,
        imageUrl
    };
}
