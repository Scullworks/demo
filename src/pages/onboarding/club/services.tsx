import { OnboardingLayout, SnackbarAlert } from '@/components';
import { useServices } from '@/hooks/pages';

function Services() {
    const {
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
    } = useServices();

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
