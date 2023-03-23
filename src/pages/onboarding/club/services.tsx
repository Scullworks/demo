import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OnboardingLayout, SnackbarAlert } from '@/components';
import { useSelectedServices } from '@/hooks';
import { useClubOnboardingStore, useStepperStore } from '@/hooks/store';

function Services() {
    const [showAlert, setShowAlert] = useState(false);

    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const updateServices = useClubOnboardingStore(state => state.updateServices);

    const router = useRouter();

    const {
        scullingSelected,
        ergSelected,
        coachingSelected,
        sweepRowSelected,
        eightSweepSelected,
        rentalSelected,
        selectedServices,
        onScullingSelect,
        onErgSelect,
        onCoachingSelect,
        onSweepRowSelect,
        onEightSweepSelect,
        onRentalSelect
    } = useSelectedServices();

    useEffect(() => {
        setActiveStep(2);
    }, [setActiveStep]);

    useEffect(() => {
        updateServices(selectedServices);
    }, [updateServices, selectedServices]);

    useEffect(() => {
        if (triggerSubmit && selectedServices.length) {
            setTriggerSubmit(false);
            router.push('/onboarding/club/boats');
        }

        if (triggerSubmit && !selectedServices.length) {
            setTriggerSubmit(false);
            setShowAlert(true);
        }
    }, [triggerSubmit, selectedServices, setTriggerSubmit, router]);

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s services</h1>
            <div className="onboarding-club__services">
                <button
                    className={`button ${scullingSelected && 'selected'}`}
                    onClick={onScullingSelect}
                >
                    Sculling
                </button>
                <button className={`button ${ergSelected && 'selected'}`} onClick={onErgSelect}>
                    ERG Workout
                </button>
                <button
                    className={`button ${coachingSelected && 'selected'}`}
                    onClick={onCoachingSelect}
                >
                    Private Coaching
                </button>
                <button
                    className={`button ${sweepRowSelected && 'selected'}`}
                    onClick={onSweepRowSelect}
                >
                    Sweep Rowing
                </button>
                <button
                    className={`button ${eightSweepSelected && 'selected'}`}
                    onClick={onEightSweepSelect}
                >
                    8x8 Sweep
                </button>
                <button
                    className={`button ${rentalSelected && 'selected'}`}
                    onClick={onRentalSelect}
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
