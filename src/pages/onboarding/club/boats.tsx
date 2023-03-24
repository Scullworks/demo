import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { FormEvent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField, OnboardingLayout } from '@/components';
import { BoatSize, useClubOnboardingStore, useStepperStore } from '@/hooks/store';
import { boatSchema } from '@/utils/validations';

interface BoatValues {
    readonly boatSize: BoatSize;
    readonly boatMake: string;
    readonly boatName: string;
}

interface BoatSizeOption {
    readonly id: number;
    readonly value: BoatSize;
}

const boatSizes: BoatSizeOption[] = [
    { id: 1, value: '8+' },
    { id: 2, value: '4+' },
    { id: 3, value: '4-' },
    { id: 4, value: '4x' },
    { id: 5, value: '2+' },
    { id: 6, value: '2-' },
    { id: 7, value: '2x' },
    { id: 8, value: '1x' }
];

function Boats() {
    const setBoatSize = useClubOnboardingStore(state => state.setBoatSize);
    const setBoatMake = useClubOnboardingStore(state => state.setBoatMake);
    const setBoatName = useClubOnboardingStore(state => state.setBoatName);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<BoatValues>({
        resolver: yupResolver(boatSchema),
        defaultValues: {
            boatSize: undefined,
            boatMake: '',
            boatName: ''
        }
    });

    const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                setBoatSize(data.boatSize);
                setBoatMake(data.boatMake);
                setBoatName(data.boatName);

                if (!errorCount) {
                    // TODO: Create a club document and add everything to firebase
                    // TODO: Delete persisted club onboarding JSON in local storage
                    // TODO: If all goes well, push to club dashboard
                }
            }),
        [errorCount, handleSubmit, setBoatMake, setBoatName, setBoatSize]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        setActiveStep(3);
    }, [setActiveStep]);

    useEffect(() => {
        if (triggerSubmit) {
            submitDetails()();
            setTriggerSubmit(false);
        }
    }, [triggerSubmit, setTriggerSubmit, submitDetails]);

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s boats</h1>
            <form className="onboarding-club__form" onSubmit={onSubmit}>
                <HookedTextField
                    name="boatSize"
                    placeholder="Boat Size"
                    control={control}
                    error={errors.boatSize?.message}
                    select
                >
                    {boatSizes.map(boat => (
                        <MenuItem key={boat.id} value={boat.value}>
                            {boat.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
                <HookedTextField
                    name="boatMake"
                    placeholder="Boat Make"
                    control={control}
                    error={errors.boatMake?.message}
                />
                <HookedTextField
                    name="boatName"
                    placeholder="Boat Name"
                    control={control}
                    error={errors.boatName?.message}
                />
            </form>
        </OnboardingLayout>
    );
}

export default Boats;
