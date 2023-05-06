import { yupResolver } from '@hookform/resolvers/yup';
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore, useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import {
    CoachMembershipType,
    OnboardingClubDoc,
    OnboardingCoach,
    Option,
    OptionWIthStripe
} from '@/models';
import { createAccount, updateFirebaseDoc } from '@/services/firebase';
import { coachDetailsSchema } from '@/utils/validations';

interface CoachDetailsValues {
    readonly phoneNumber: string;
    readonly club: string;
    readonly membershipType: CoachMembershipType | string;
}

export function useCoachDetails(clubs: OptionWIthStripe[] | null | undefined) {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const user = useAuthStore(state => state.user);
    const name = useCommonOnboardingStore(state => state.name);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

    const { clearStorageStartedOnboarding, setStorageCompletedOnboarding } = useLocalStorage();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        register,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<CoachDetailsValues>({
        resolver: yupResolver(coachDetailsSchema),
        defaultValues: {
            phoneNumber: '',
            club: '',
            membershipType: ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
                const { phoneNumber, club, membershipType } = data;

                const selectedClub = clubs?.find(c => c.value === club) as Option;

                const coachData: OnboardingCoach = {
                    uid: user?.uid as string,
                    name,
                    email: user?.email as string,
                    phoneNumber,
                    club: { id: selectedClub.id, name: selectedClub.value, stripeId: null },
                    membershipType,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                };

                if (isValid) {
                    setIsCreatingAccount(true);

                    const { success, error } = await createAccount<OnboardingClubDoc>(
                        'coaches',
                        coachData,
                        imageUrl
                    );

                    if (error) setIsCreatingAccount(false);

                    if (success) {
                        const uid = user?.uid as string;
                        await updateFirebaseDoc('users', uid, { completedOnboarding: true });
                        clearStorageStartedOnboarding();
                        setStorageCompletedOnboarding();
                        router.push('/profile/coach');
                    }
                }
            }),
        [
            clubs,
            handleSubmit,
            imageUrl,
            isValid,
            name,
            router,
            user,
            clearStorageStartedOnboarding,
            setStorageCompletedOnboarding
        ]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        if (triggerSubmit) {
            submitDetails()();
            setTriggerSubmit(false);
        }
    }, [setTriggerSubmit, submitDetails, triggerSubmit]);

    useEffect(() => {
        setActiveStep(1);
    }, [setActiveStep]);

    return {
        isCreatingAccount,
        onSubmit,
        control,
        errors,
        register,
        clearErrors
    };
}
