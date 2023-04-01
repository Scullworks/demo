import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useSelectedServices } from '@/hooks/pages';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';

export function useServices() {
    const [showAlert, setShowAlert] = useState(false);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const storedServices = useClubOnboardingStore(state => state.services);
    const updateServices = useClubOnboardingStore(state => state.updateServices);
    const storageSelectedServices = useMemo(() => storedServices, [storedServices]);

    const router = useRouter();

    const {
        selectedServices,
        setServices,
        selectSculling,
        selectErg,
        selectCoaching,
        selectSweepRow,
        selectEightSweep,
        selectRental
    } = useSelectedServices();

    const scullingHighlight = selectedServices.includes('Sculling');
    const ergHighlight = selectedServices.includes('ERG Workout');
    const coachingHighlight = selectedServices.includes('Private Coaching');
    const sweepRowHighlight = selectedServices.includes('Sweep Rowing');
    const eightSweepHighlight = selectedServices.includes('8x8 Sweep');
    const rentalHighlight = selectedServices.includes('Gear Rental');

    useEffect(() => {
        setActiveStep(2);
    }, [setActiveStep]);

    useEffect(() => {
        setServices(storageSelectedServices);
    }, [setServices, storageSelectedServices]);

    useEffect(() => {
        if (triggerSubmit && selectedServices.length) {
            setTriggerSubmit(false);
            updateServices(selectedServices);
            router.push('boats');
        }

        if (triggerSubmit && !selectedServices.length) {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [triggerSubmit, selectedServices, setTriggerSubmit, router, updateServices]);

    return {
        scullingHighlight,
        ergHighlight,
        coachingHighlight,
        sweepRowHighlight,
        eightSweepHighlight,
        rentalHighlight,
        selectSculling,
        selectErg,
        selectCoaching,
        selectSweepRow,
        selectEightSweep,
        selectRental,
        showAlert,
        setShowAlert
    };
}
