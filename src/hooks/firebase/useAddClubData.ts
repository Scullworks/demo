import { Dayjs } from 'dayjs';
import { serverTimestamp } from 'firebase/firestore';
import { useAuthStore, useClubOnboardingStore, useCommonOnboardingStore } from '@/hooks/store';
import { FirebaseClub } from '@/models';

export function useAddClubData() {
    const user = useAuthStore(state => state.user);
    const name = useCommonOnboardingStore(state => state.name);
    const phoneNumber = useCommonOnboardingStore(state => state.phoneNumber);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);

    const addressJSON = useClubOnboardingStore(state => state.address);
    const cancellationPolicy = useClubOnboardingStore(state => state.cancellationPolicy);
    const closingTime = useClubOnboardingStore(state => state.closingTime) as Dayjs;
    const openingTime = useClubOnboardingStore(state => state.openingTime) as Dayjs;
    const services = useClubOnboardingStore(state => state.services);

    const address = JSON.parse(addressJSON as string);

    const clubData: FirebaseClub = {
        uid: user?.uid as string,
        name,
        email: user?.email as string,
        phoneNumber,
        address: address?.description,
        cancellationPolicy,
        closingTime: closingTime?.toString(),
        openingTime: openingTime?.toString(),
        services,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        stripe: {
            id: null,
            connected: false
        }
    };

    return {
        clubData,
        imageUrl
    };
}
