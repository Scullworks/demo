import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { OnboardingLayout, SnackbarAlert } from '@/components';
import { useSelectedServices } from '@/hooks';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';

function Services() {
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
            router.push('/onboarding/club/boats');
        }

        if (triggerSubmit && !selectedServices.length) {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [triggerSubmit, selectedServices, setTriggerSubmit, router, updateServices]);

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s services</h1>
            <div className="onboarding-club__services">
                <button
                    className={`button ${scullingHighlight && 'selected'}`}
                    onClick={selectSculling}
                >
                    Sculling
                </button>
                <button className={`button ${ergHighlight && 'selected'}`} onClick={selectErg}>
                    ERG Workout
                </button>
                <button
                    className={`button ${coachingHighlight && 'selected'}`}
                    onClick={selectCoaching}
                >
                    Private Coaching
                </button>
                <button
                    className={`button ${sweepRowHighlight && 'selected'}`}
                    onClick={selectSweepRow}
                >
                    Sweep Rowing
                </button>
                <button
                    className={`button ${eightSweepHighlight && 'selected'}`}
                    onClick={selectEightSweep}
                >
                    8x8 Sweep
                </button>
                <button
                    className={`button ${rentalHighlight && 'selected'}`}
                    onClick={selectRental}
                >
                    Gear Rental
                </button>

                <SnackbarAlert
                    text="Please select at least one service"
                    severity="error"
                    open={showAlert}
                    setOpen={setShowAlert}
                />
            </div>
        </OnboardingLayout>
    );
}

export default Services;
