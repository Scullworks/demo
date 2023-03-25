import { yupResolver } from '@hookform/resolvers/yup';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Boat, BoatSize, useClubOnboardingStore, useStepperStore } from '@/hooks/store';
import { boatSchema } from '@/utils/validations';

interface BoatValues {
    readonly boatSize: BoatSize | string;
    readonly boatMake: string;
    readonly boatName: string;
}

export function useBoats() {
    const [showAlert, setShowAlert] = useState(false);

    const boats = useClubOnboardingStore(state => state.boats);
    const addBoat = useClubOnboardingStore(state => state.addBoat);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<BoatValues>({
        resolver: yupResolver(boatSchema),
        defaultValues: {
            boatSize: '',
            boatMake: '',
            boatName: ''
        }
    });

    const boatsCount = useMemo(() => Object.keys(boats).length, [boats]);

    const addBoatToStore = useCallback(
        () =>
            handleSubmit(data => {
                const { boatSize, boatMake, boatName } = data;

                const userAddedBoat = boatSize !== null && boatMake !== null && boatName !== null;
                const boat: Boat = {
                    size: boatSize as BoatSize,
                    make: boatMake,
                    name: boatName
                };

                if (isValid && userAddedBoat) addBoat(boat);
            }),
        [handleSubmit, isValid, addBoat]
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

    return {
        onSubmit,
        control,
        errors,
        addBoatToStore,
        boats,
        showAlert,
        setShowAlert
    };
}
