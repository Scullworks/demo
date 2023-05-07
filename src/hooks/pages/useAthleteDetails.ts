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

export interface AthleteDetailsValues {
    readonly phoneNumber: string;
    readonly dateOfBirth: string;
    readonly emergencyName: string;
    readonly emergencyNumber: string;
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
            phoneNumber: phoneNumber ?? '',
            dateOfBirth: persistedDateOfBirth ?? undefined,
            emergencyName: emergencyName ?? '',
            emergencyNumber: emergencyNumber ?? ''
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
                    router.push('membership');
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

    if (triggerSubmit) {
        setTriggerSubmit(false);
        submitDetails()();
    }

    return {
        onSubmit,
        control,
        errors
    };
}
