import { OnboardingLayout, PageTitle, SnackbarAlert } from '@/components';
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
        <>
            <PageTitle text="Club Services" />
            <OnboardingLayout>
                <h1>Club Services</h1>
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
                </div>

                <SnackbarAlert
                    text="Please select at least one service"
                    severity="error"
                    hideCloseButton
                    open={showAlert}
                    setOpen={setShowAlert}
                />
            </OnboardingLayout>
        </>
    );
}

export default Services;
