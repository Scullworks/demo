import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelectedServices } from '@/hooks/pages';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';

export function useServices() {
    const [showAlert, setShowAlert] = useState(false);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const storedServices = useClubOnboardingStore(state => state.services);
    const updateServices = useClubOnboardingStore(state => state.updateServices);

    const router = useRouter();

    const {
        services,
        setServices,
        selectSculling,
        selectErg,
        selectCoaching,
        selectSweepRow,
        selectEightSweep,
        selectRental
    } = useSelectedServices();

    const scullingHighlight = services.includes('Sculling');
    const ergHighlight = services.includes('ERG Workout');
    const coachingHighlight = services.includes('Private Coaching');
    const sweepRowHighlight = services.includes('Sweep Rowing');
    const eightSweepHighlight = services.includes('8x8 Sweep');
    const rentalHighlight = services.includes('Gear Rental');

    useEffect(() => {
        if (triggerSubmit && services.length) {
            setTriggerSubmit(false);
            updateServices(services);
            router.push('boats');
        }

        if (triggerSubmit && !services.length) {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [router, services, setTriggerSubmit, triggerSubmit, updateServices]);

    useEffect(() => {
        setActiveStep(2);
    }, [setActiveStep]);

    useEffect(() => {
        setServices(storedServices);
    }, [setServices, storedServices]);

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
