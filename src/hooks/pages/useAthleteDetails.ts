import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    useAthleteOnboardingStore,
    useCommonOnboardingStore,
    useStepperStore
} from '@/hooks/store';
import { athleteDetailsSchema } from '@/utils/validations';

interface AthleteDetailsValues {
    readonly phoneNumber: number;
    readonly dateOfBirth: string;
    readonly emergencyName: string;
    readonly emergencyNumber: number;
}

export function useAthleteDetails() {
    const phoneNumber = useCommonOnboardingStore(state => state.phoneNumber);
    const dateOfBirth = useAthleteOnboardingStore(state => state.dateOfBirth);
    const emergencyName = useAthleteOnboardingStore(state => state.emergencyName);
    const emergencyNumber = useAthleteOnboardingStore(state => state.emergencyNumber);
    const setPhoneNumber = useCommonOnboardingStore(state => state.setPhoneNumber);
    const setDateOfBirth = useAthleteOnboardingStore(state => state.setDateOfBirth);
    const setEmergencyName = useAthleteOnboardingStore(state => state.setEmergencyName);
    const setEmergencyNumber = useAthleteOnboardingStore(state => state.setEmergencyNumber);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const nextStep = useStepperStore(state => state.nextStep);

    const router = useRouter();

    const persistedDateOfBirth = dateOfBirth ? (dayjs(dateOfBirth) as unknown as string) : null;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<AthleteDetailsValues>({
        resolver: yupResolver(athleteDetailsSchema),
        defaultValues: {
            phoneNumber: phoneNumber ?? undefined,
            dateOfBirth: persistedDateOfBirth ?? undefined,
            emergencyName: emergencyName ?? '',
            emergencyNumber: emergencyNumber ?? undefined
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                const { phoneNumber, dateOfBirth, emergencyName, emergencyNumber } = data;

                setPhoneNumber(phoneNumber);
                setDateOfBirth(dayjs(dateOfBirth));
                setEmergencyName(emergencyName);
                setEmergencyNumber(emergencyNumber);

                if (isValid) {
                    router.push('/onboarding/athlete/membership');
                    nextStep();
                }
            }),
        [
            handleSubmit,
            isValid,
            nextStep,
            router,
            setDateOfBirth,
            setEmergencyName,
            setEmergencyNumber,
            setPhoneNumber
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
        onSubmit,
        control,
        errors
    };
}
