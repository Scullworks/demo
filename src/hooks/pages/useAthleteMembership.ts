import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAthleteOnboardingStore, useStepperStore } from '@/hooks/store';
import { AthleteMembershipType, Option, PositionPreference } from '@/models';
import { athleteMembershipSchema } from '@/utils/validations';

interface AthleteMembershipValues {
    readonly club: string;
    readonly membershipType: string;
    readonly positionPreference: string;
}

export function useAthleteMembership() {
    const [clubs] = useState<Option[]>([]);

    const club = useAthleteOnboardingStore(state => state.club);
    const membershipType = useAthleteOnboardingStore(state => state.membershipType);
    const positionPreference = useAthleteOnboardingStore(state => state.positionPreference);
    const setClub = useAthleteOnboardingStore(state => state.setClub);
    const setMembershipType = useAthleteOnboardingStore(state => state.setMembershipType);
    const setPositionPreference = useAthleteOnboardingStore(state => state.setPositionPreference);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

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
            handleSubmit(data => {
                const { club, membershipType, positionPreference } = data;

                setClub(club);
                setMembershipType(membershipType as AthleteMembershipType);
                setPositionPreference(positionPreference as PositionPreference);

                if (isValid) {
                    // TODO: Create a athlete document and add everything to firebase
                    // TODO: Delete persisted athlete onboarding JSON in local storage
                    // TODO: If all goes well, push to athlete dashboard
                }
            }),
        [handleSubmit, isValid, setClub, setMembershipType, setPositionPreference]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        // TODO: Get all clubs from firebase and update setClubs
    }, []);

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
        onSubmit,
        control,
        errors,
        club,
        register,
        clearErrors,
        clubs
    };
}
