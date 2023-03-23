import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField, HookedTimeField, OnboardingLayout } from '@/components';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';
import { operationSchema } from '@/utils/validations';

interface OperationValues {
    readonly openingTime: string;
    readonly closingTime: string;
    readonly cancellationPolicy: string;
    readonly address: string;
    readonly phoneNumber: number;
}

function Details() {
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const nextStep = useStepperStore(state => state.nextStep);

    const setOpeningTime = useClubOnboardingStore(state => state.setOpeningTime);
    const setClosingTime = useClubOnboardingStore(state => state.setClosingTime);
    const setCancellationPolicy = useClubOnboardingStore(state => state.setCancellationPolicy);
    const setAddress = useClubOnboardingStore(state => state.setAddress);
    const setPhoneNumber = useClubOnboardingStore(state => state.setPhoneNumber);

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<OperationValues>({
        resolver: yupResolver(operationSchema),
        defaultValues: {
            openingTime: undefined,
            closingTime: undefined,
            cancellationPolicy: '',
            address: '',
            phoneNumber: undefined
        }
    });

    const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                setOpeningTime(data.openingTime);
                setClosingTime(data.closingTime);
                setCancellationPolicy(data.cancellationPolicy);
                setAddress(data.address);
                setPhoneNumber(data.phoneNumber);

                if (!errorCount) {
                    router.push('/onboarding/club/services');
                    nextStep();
                }
            }),
        [
            handleSubmit,
            errorCount,
            nextStep,
            router,
            setAddress,
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

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s operating hours and policies</h1>
            <form className="onboarding-club__form" onSubmit={onSubmit}>
                <div className="onboarding-club__opening-hours">
                    <HookedTimeField
                        name="openingTime"
                        label="Opening Time"
                        control={control}
                        error={errors.openingTime?.message}
                    />
                    <HookedTimeField
                        name="closingTime"
                        label="Closing Time"
                        control={control}
                        error={errors.closingTime?.message}
                    />
                </div>
                <HookedTextField
                    name="cancellationPolicy"
                    control={control}
                    error={errors.cancellationPolicy?.message}
                    placeholder="Cancellation Policy"
                />
                <HookedTextField name="address" control={control} error={errors.address?.message} />
                <HookedTextField
                    name="phoneNumber"
                    control={control}
                    error={errors.phoneNumber?.message}
                    type="number"
                    placeholder="Phone Number"
                />
            </form>
        </OnboardingLayout>
    );
}

export default Details;
