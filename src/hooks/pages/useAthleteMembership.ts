import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAddAthleteData } from '@/hooks/firebase';
import { useAthleteOnboardingStore, useStepperStore } from '@/hooks/store';
import {
    AthleteMembershipType,
    FirebaseAthlete,
    FirebaseClubDoc,
    Option,
    PositionPreference
} from '@/models';
import { createAccount } from '@/services/firebase';
import { athleteMembershipSchema } from '@/utils/validations';

interface AthleteMembershipValues {
    readonly club: string;
    readonly membershipType: string;
    readonly positionPreference: string;
}

interface AthleteDetailsProps {
    readonly clubs: Option[] | null;
}

export function useAthleteMembership({ clubs }: AthleteDetailsProps) {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const club = useAthleteOnboardingStore(state => state.club);
    const membershipType = useAthleteOnboardingStore(state => state.membershipType);
    const positionPreference = useAthleteOnboardingStore(state => state.positionPreference);
    const setClub = useAthleteOnboardingStore(state => state.setClub);
    const setMembershipType = useAthleteOnboardingStore(state => state.setMembershipType);
    const setPositionPreference = useAthleteOnboardingStore(state => state.setPositionPreference);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

    const { partialAthleteData, imageUrl } = useAddAthleteData();
    const { clearOnboardingStores } = useLocalStorage();

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

                const selectedClub = clubs?.find(c => c.value === club) as Option;

                const athleteData: FirebaseAthlete = {
                    ...partialAthleteData,
                    club: { id: selectedClub.id, name: selectedClub.value },
                    membershipType,
                    positionPreference
                };

                setClub(club);
                setMembershipType(membershipType as AthleteMembershipType);
                setPositionPreference(positionPreference as PositionPreference);

                if (isValid) {
                    setIsCreatingAccount(true);

                    const { success, error } = await createAccount<FirebaseClubDoc>(
                        'athletes',
                        athleteData,
                        imageUrl
                    );

                    if (error) setIsCreatingAccount(false);

                    if (success) {
                        clearOnboardingStores();
                        router.push('/dashboard/athlete');
                    }
                }
            }),
        [
            clearOnboardingStores,
            clubs,
            handleSubmit,
            imageUrl,
            isValid,
            partialAthleteData,
            router,
            setClub,
            setMembershipType,
            setPositionPreference
        ]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        setActiveStep(2);
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
        clearErrors
    };
}
