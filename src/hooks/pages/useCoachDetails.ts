import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Option } from '@/components';
import { CoachMembershipType, useCoachOnboardingStore, useStepperStore } from '@/hooks/store';
import { coachDetailsSchema } from '@/utils/validations';

interface CoachDetailsValues {
    readonly phoneNumber: number;
    readonly club: string;
    readonly membershipType: CoachMembershipType | string;
}

export function useCoachDetails() {
    const [clubs] = useState<Option[]>([]);

    const phoneNumber = useCoachOnboardingStore(state => state.phoneNumber);
    const club = useCoachOnboardingStore(state => state.club);
    const membershipType = useCoachOnboardingStore(state => state.membershipType);
    const setPhoneNumber = useCoachOnboardingStore(state => state.setPhoneNumber);
    const setClub = useCoachOnboardingStore(state => state.setClub);
    const setMembershipType = useCoachOnboardingStore(state => state.setMembershipType);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);

    const {
        control,
        handleSubmit,
        register,
        clearErrors,
        formState: { errors, isValid }
    } = useForm<CoachDetailsValues>({
        resolver: yupResolver(coachDetailsSchema),
        defaultValues: {
            phoneNumber: phoneNumber ?? undefined,
            club: club ?? '',
            membershipType: membershipType ?? ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                const { phoneNumber, club, membershipType } = data;

                setPhoneNumber(phoneNumber);
                setClub(club);
                setMembershipType(membershipType as CoachMembershipType);

                if (isValid) {
                    // TODO: Create a coach document and add everything to firebase
                    // TODO: Delete persisted coach onboarding JSON in local storage
                    // TODO: If all goes well, push to coach dashboard
                }
            }),
        [handleSubmit, isValid, setClub, setMembershipType, setPhoneNumber]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        // TODO: Get all clubs from firebase and update setClubs
    }, []);

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
        onSubmit,
        control,
        errors,
        club,
        register,
        clearErrors,
        clubs
    };
}
