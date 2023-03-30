import { Dayjs } from 'dayjs';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthStore, useClubOnboardingStore, useCommonOnboardingStore } from '@/hooks/store';

export interface FirebaseClub {
    readonly uid: string | undefined;
    readonly name: string | null;
    readonly email: string | undefined;
    readonly phoneNumber: number | null;
    readonly address: string | null;
    readonly cancellationPolicy: string | null;
    readonly closingTime: string | null;
    readonly openingTime: string | null;
    readonly services: string[];
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
}

export function useAddClubData() {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

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
        updatedAt: serverTimestamp()
    };

    return {
        clubData,
        imageUrl,
        isCreatingAccount,
        setIsCreatingAccount
    };
}
