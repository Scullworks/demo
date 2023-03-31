import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PlaceType } from '@/components';
import { useClubOnboardingStore, useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import { operationSchema } from '@/utils/validations';

interface OperationValues {
    readonly openingTime: string;
    readonly closingTime: string;
    readonly cancellationPolicy: string;
    readonly address: string;
    readonly phoneNumber: number;
}

export function useClubDetails() {
    const openingTime = useClubOnboardingStore(state => state.openingTime);
    const closingTime = useClubOnboardingStore(state => state.closingTime);
    const cancellationPolicy = useClubOnboardingStore(state => state.cancellationPolicy);
    const address = useClubOnboardingStore(state => state.address);
    const phoneNumber = useCommonOnboardingStore(state => state.phoneNumber);
    const setOpeningTime = useClubOnboardingStore(state => state.setOpeningTime);
    const setClosingTime = useClubOnboardingStore(state => state.setClosingTime);
    const setCancellationPolicy = useClubOnboardingStore(state => state.setCancellationPolicy);
    const setPhoneNumber = useCommonOnboardingStore(state => state.setPhoneNumber);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const nextStep = useStepperStore(state => state.nextStep);

    const addressPlaceType = JSON.parse(address as string) as PlaceType;
    const persistedOpeningTime = openingTime ? (dayjs(openingTime) as unknown as string) : null;
    const persistedClosingTime = closingTime ? (dayjs(closingTime) as unknown as string) : null;

    const router = useRouter();

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isValid }
    } = useForm<OperationValues>({
        resolver: yupResolver(operationSchema),
        defaultValues: {
            openingTime: persistedOpeningTime ?? undefined,
            closingTime: persistedClosingTime ?? undefined,
            cancellationPolicy: cancellationPolicy ?? '',
            address: address ?? '',
            phoneNumber: phoneNumber ?? ('' as unknown as number)
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                const { openingTime, closingTime, cancellationPolicy, phoneNumber } = data;

                setOpeningTime(dayjs(openingTime));
                setClosingTime(dayjs(closingTime));
                setCancellationPolicy(cancellationPolicy);
                setPhoneNumber(phoneNumber);

                if (isValid) {
                    router.push('/onboarding/club/services');
                    nextStep();
                }
            }),
        [
            handleSubmit,
            isValid,
            nextStep,
            router,
            setCancellationPolicy,
            setClosingTime,
            setOpeningTime,
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
        addressPlaceType,
        onSubmit,
        control,
        errors,
        register
    };
}
