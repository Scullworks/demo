import { HookedDateField, HookedTextField, OnboardingLayout, PageTitle } from '@/components';
import { useAthleteDetails } from '@/hooks/pages';

function AthleteDetails() {
    const { onSubmit, control, errors } = useAthleteDetails();

    return (
        <>
            <PageTitle text="Further Details" />
            <OnboardingLayout>
                <h1>Your Details</h1>
                <form className="onboarding__form" onSubmit={onSubmit}>
                    <HookedTextField
                        name="phoneNumber"
                        control={control}
                        error={errors.phoneNumber?.message}
                        type="tel"
                        placeholder="Phone Number"
                    />
                    <HookedDateField
                        name="dateOfBirth"
                        label="Date of Birth"
                        control={control}
                        error={errors.dateOfBirth?.message}
                    />
                    <HookedTextField
                        name="emergencyName"
                        control={control}
                        error={errors.emergencyName?.message}
                        placeholder="Emergency Contact Name"
                    />
                    <HookedTextField
                        name="emergencyNumber"
                        control={control}
                        error={errors.emergencyNumber?.message}
                        placeholder="Emergency Contact Number"
                    />
                </form>
            </OnboardingLayout>
        </>
    );
}

export default AthleteDetails;
