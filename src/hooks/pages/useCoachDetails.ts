import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Option } from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore, useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import { CoachMembershipType, FirebaseClubDoc, FirebaseCoach } from '@/models';
import { createAccount } from '@/services/firebase';
import { coachDetailsSchema } from '@/utils/validations';

interface CoachDetailsValues {
    readonly phoneNumber: number;
    readonly club: string;
    readonly membershipType: CoachMembershipType | string;
}

interface CoachDetailsProps {
    readonly clubs: Option[] | null;
}

export function useCoachDetails({ clubs }: CoachDetailsProps) {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const user = useAuthStore(state => state.user);
    const name = useCommonOnboardingStore(state => state.name);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

    const { clearOnboardingStores } = useLocalStorage();

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
            phoneNumber: undefined,
            club: '',
            membershipType: ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
                const { phoneNumber, club, membershipType } = data;

                const selectedClub = clubs?.find(c => c.value === club) as Option;

                const coachData: FirebaseCoach = {
                    uid: user?.uid as string,
                    name,
                    email: user?.email as string,
                    phoneNumber,
                    club: { id: selectedClub.id, name: selectedClub.value },
                    membershipType
                };

                if (isValid) {
                    setIsCreatingAccount(true);

                    const { success, error } = await createAccount<FirebaseClubDoc>(
                        'coaches',
                        coachData,
                        imageUrl
                    );

                    if (error) setIsCreatingAccount(false);

                    if (success) {
                        clearOnboardingStores();
                        router.push('/dashboard/coach');
                    }
                }
            }),
        [
            clearOnboardingStores,
            clubs,
            handleSubmit,
            imageUrl,
            isValid,
            name,
            router,
            user?.email,
            user?.uid
        ]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        setActiveStep(1);
    }, [setActiveStep]);

    useEffect(() => {
        if (triggerSubmit) {
            submitDetails()();
            setTriggerSubmit(false);
        }
    }, [triggerSubmit, setTriggerSubmit, submitDetails]);

    return {
        isCreatingAccount,
        onSubmit,
        control,
        errors,
        register,
        clearErrors,
        clubs
    };
}
