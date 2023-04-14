import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAddClubData } from '@/hooks/firebase';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';
import { Boat, BoatSize, OnboardingClub } from '@/models';
import { createAccount } from '@/services/firebase';
import { boatSchema } from '@/utils/validations';

export interface BoatValues {
    readonly boatSize: BoatSize | string;
    readonly boatMake: string;
    readonly boatName: string;
}

export function useBoats() {
    const [showAlert, setShowAlert] = useState(false);
    const [isMobilePhone, setIsMobilePhone] = useState(false);
    const [boatCountText, setBoatCountText] = useState('');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const boats = useClubOnboardingStore(state => state.boats);
    const addBoat = useClubOnboardingStore(state => state.addBoat);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);

    const { clubData, imageUrl } = useAddClubData();
    const { clearOnboardingStores } = useLocalStorage();

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

    const boatCount = useMemo(() => Object.keys(boats).length, [boats]);

    const addBoatToStore = useCallback(
        () =>
            handleSubmit(data => {
                const { boatSize, boatMake, boatName } = data;

                const userAddedBoat = boatSize !== null && boatMake !== null && boatName !== null;
                const boat: Boat = {
                    size: boatSize as BoatSize,
                    make: boatMake,
                    name: boatName
                };

                if (isValid && userAddedBoat) {
                    addBoat(boat);
                    clearFields();
                }
            }),
        [handleSubmit, isValid, addBoat, clearFields]
    );

    const submitDetails = useCallback(async () => {
        if (boatCount) {
            setIsCreatingAccount(true);

            const { success, error } = await createAccount<OnboardingClub>(
                'clubs',
                clubData,
                imageUrl,
                boats
            );

            if (error) setIsCreatingAccount(false);
            if (success) {
                clearOnboardingStores();
                router.push('/profile/club');
            }
        }

        if (!boatCount) {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [
        boatCount,
        boats,
        clubData,
        imageUrl,
        clearOnboardingStores,
        setIsCreatingAccount,
        setTriggerSubmit,
        router
    ]);

    useEffect(() => {
        setActiveStep(3);
    }, [setActiveStep]);

    useEffect(() => {
        if (triggerSubmit) {
            setTriggerSubmit(false);
            submitDetails();
        }
    }, [setTriggerSubmit, submitDetails, triggerSubmit]);

    useEffect(() => {
        function checkWindowWidth() {
            if (window.innerWidth <= 500) {
                setIsMobilePhone(true);
            } else {
                setIsMobilePhone(false);
            }
        }

        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        };
    }, [isMobilePhone]);

    useEffect(() => {
        if (!isMobilePhone) return;
        if (!boatCount) setBoatCountText('No boats added');
        if (boatCount === 1) setBoatCountText('1 boat added');
        if (boatCount > 1) setBoatCountText(`${boatCount} boats added`);
    }, [isMobilePhone, boatCount]);

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
