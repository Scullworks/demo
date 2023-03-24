import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField, OnboardingLayout, SnackbarAlert } from '@/components';
import { Boat, BoatSize, useClubOnboardingStore, useStepperStore } from '@/hooks/store';
import { boatSchema } from '@/utils/validations';

interface BoatValues {
    readonly boatSize: BoatSize | string;
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
    const [showAlert, setShowAlert] = useState(false);

    const boats = useClubOnboardingStore(state => state.boats);
    const addBoat = useClubOnboardingStore(state => state.addBoat);
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
            boatSize: '',
            boatMake: '',
            boatName: ''
        }
    });

    const errorCount = useMemo(() => Object.keys(errors).length, [errors]);
    const boatsCount = useMemo(() => Object.keys(boats).length, [boats]);

    const addBoatToStore = useCallback(
        () =>
            handleSubmit(data => {
                const { boatSize, boatMake, boatName } = data;

                const userAddedBoat = boatSize !== null && boatMake !== null && boatSize !== null;
                const boat: Boat = {
                    size: boatSize as BoatSize,
                    make: boatMake,
                    name: boatName
                };

                if (!errorCount && userAddedBoat) addBoat(boat);
            }),
        [handleSubmit, errorCount, addBoat]
    );

    const submitDetails = useCallback(() => {
        if (boatsCount) {
            // TODO: Create a club document and add everything to firebase
            // TODO: Delete persisted club onboarding JSON in local storage
            // TODO: If all goes well, push to club dashboard
        } else {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [boatsCount, setTriggerSubmit]);

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails();
    }

    useEffect(() => {
        setActiveStep(3);
    }, [setActiveStep]);

    useEffect(() => {
        if (triggerSubmit) {
            setTriggerSubmit(false);
            submitDetails();
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
                <button
                    className="onboarding-club__boats-button"
                    type="button"
                    onClick={() => addBoatToStore()()}
                >
                    Add Boat
                </button>

                {/* Boats */}
                <div className="onboarding-club__boats-names">
                    {boats.map(boat => (
                        <p key={boat.name}>{boat.name}</p>
                    ))}
                </div>

                {/* Alert */}
                <SnackbarAlert
                    text="Please add at least one boat"
                    severity="error"
                    open={showAlert}
                    setOpen={setShowAlert}
                />
            </form>
        </OnboardingLayout>
    );
}

export default Boats;
