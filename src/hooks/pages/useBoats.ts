import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAddClubData } from '@/hooks/firebase';
import {
    useAuthStore,
    useClubOnboardingStore,
    useCommonOnboardingStore,
    useStepperStore
} from '@/hooks/store';
import { Boat, BoatSize, OnboardingClub } from '@/models';
import { createAccount, updateFirebaseDoc } from '@/services/firebase';
import { boatSchema } from '@/utils/validations';

export interface BoatValues {
    readonly boatSize: BoatSize | string;
    readonly boatMake: string;
    readonly boatName: string;
}

export function useBoats() {
    const [showAlert, setShowAlert] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const user = useAuthStore(state => state.user);
    const boats = useClubOnboardingStore(state => state.boats);
    const addBoat = useClubOnboardingStore(state => state.addBoat);
    const resetClubStore = useClubOnboardingStore(state => state.reset);
    const resetCommonStore = useCommonOnboardingStore(state => state.reset);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);

    const { clearStorageStartedOnboarding, setStorageCompletedOnboarding } = useLocalStorage();

    const { clubData, imageUrl } = useAddClubData();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset: clearFields,
        formState: { errors, isValid }
    } = useForm<BoatValues>({
        resolver: yupResolver(boatSchema),
        defaultValues: {
            boatSize: '',
            boatMake: '',
            boatName: ''
        }
    });

    function addBoatToStore() {
        return handleSubmit(data => {
            const { boatSize, boatMake, boatName } = data;

            const userAddedBoat = boatSize && boatMake && boatName;

            const boat: Boat = {
                size: boatSize as BoatSize,
                make: boatMake,
                name: boatName
            };

            if (isValid && userAddedBoat) {
                addBoat(boat);
                clearFields();
            }
        });
    }

    const boatCount = boats.length;

    async function submitDetails() {
        if (!boatCount) {
            setShowAlert(true);
            return;
        }

        setTriggerSubmit(false);
        setIsCreatingAccount(true);

        const { success, error } = await createAccount<OnboardingClub>(
            'clubs',
            clubData,
            imageUrl,
            boats
        );

        if (error) {
            setIsCreatingAccount(false);
        }

        if (success) {
            const uid = user?.uid as string;
            await updateFirebaseDoc('users', uid, { completedOnboarding: true });
            resetCommonStore();
            resetClubStore();
            clearStorageStartedOnboarding();
            setStorageCompletedOnboarding();
            router.push('/profile/club');
        }
    }

    const isMobilePhoneRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobilePhone = isMobilePhoneRef.current;

    let boatCountText = '';

    if (isMobilePhone && !boatCount) boatCountText = 'No boats added';
    if (isMobilePhone && boatCount === 1) boatCountText = '1 boat added';
    if (isMobilePhone && boatCount > 1) boatCountText = `${boatCount} boats added`;

    useEffect(() => {
        setActiveStep(3);
    }, [setActiveStep]);

    if (triggerSubmit) {
        setTriggerSubmit(false);
        submitDetails();
    }

    return {
        isCreatingAccount,
        boats,
        boatCountText,
        showAlert,
        isMobilePhone,
        control,
        errors,
        addBoatToStore,
        setShowAlert
    };
}
