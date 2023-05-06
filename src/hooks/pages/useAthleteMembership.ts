import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAddAthleteData } from '@/hooks/firebase';
import { useAthleteOnboardingStore, useAuthStore, useStepperStore } from '@/hooks/store';
import {
    AthleteMembershipType,
    OnboardingAthlete,
    OnboardingClubDoc,
    OptionWIthStripe,
    PositionPreference
} from '@/models';
import { createAccount, updateFirebaseDoc } from '@/services/firebase';
import { athleteMembershipSchema } from '@/utils/validations';

interface AthleteMembershipValues {
    readonly club: string;
    readonly membershipType: string;
    readonly positionPreference: string;
}

export function useAthleteMembership(clubs: OptionWIthStripe[] | null | undefined) {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const user = useAuthStore(state => state.user);
    const club = useAthleteOnboardingStore(state => state.club);
    const membershipType = useAthleteOnboardingStore(state => state.membershipType);
    const positionPreference = useAthleteOnboardingStore(state => state.positionPreference);
    const setClub = useAthleteOnboardingStore(state => state.setClub);
    const setMembershipType = useAthleteOnboardingStore(state => state.setMembershipType);
    const setPositionPreference = useAthleteOnboardingStore(state => state.setPositionPreference);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

    const { clearStorageStartedOnboarding, setStorageCompletedOnboarding } = useLocalStorage();

    const { partialAthleteData, imageUrl } = useAddAthleteData();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        register,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<AthleteMembershipValues>({
        resolver: yupResolver(athleteMembershipSchema),
        defaultValues: {
            club: club ?? '',
            membershipType: membershipType ?? '',
            positionPreference: positionPreference ?? ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
                const { club, membershipType, positionPreference } = data;

                const selectedClub = clubs?.find(c => c.value === club) as OptionWIthStripe;

                const athleteData: OnboardingAthlete = {
                    ...partialAthleteData,
                    club: {
                        id: selectedClub.id,
                        name: selectedClub.value,
                        stripeId: selectedClub.stripeId
                    },
                    membershipType,
                    positionPreference
                };

                setClub(club);
                setMembershipType(membershipType as AthleteMembershipType);
                setPositionPreference(positionPreference as PositionPreference);

                if (isValid) {
                    setIsCreatingAccount(true);

                    const { success, error } = await createAccount<OnboardingClubDoc>(
                        'athletes',
                        athleteData,
                        imageUrl
                    );

                    if (error) setIsCreatingAccount(false);

                    if (success) {
                        const uid = user?.uid as string;
                        await updateFirebaseDoc('users', uid, { completedOnboarding: true });
                        clearStorageStartedOnboarding();
                        setStorageCompletedOnboarding();
                        router.push('/profile/athlete');
                    }
                }
            }),
        [
            clubs,
            handleSubmit,
            imageUrl,
            isValid,
            partialAthleteData,
            router,
            setClub,
            setMembershipType,
            setPositionPreference,
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
        setActiveStep(2);
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
