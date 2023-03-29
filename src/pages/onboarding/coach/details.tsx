import { MenuItem } from '@mui/material';
import { Autocomplete, HookedTextField, OnboardingLayout, Option } from '@/components';
import { useCoachDetails } from '@/hooks/pages';
import { CoachMembership } from '@/hooks/store';

const coachMembershipOptions: Option<CoachMembership>[] = [
    { id: '3f269ba5-c4ab-453f-b00b-90239cb81ad7', value: 'Coach' },
    { id: '48755830-29b5-4255-9d75-a58dffaea420', value: 'Guest Coach' }
];

function CoachDetails() {
    const { onSubmit, control, errors, club, register, clearErrors, clubs } = useCoachDetails();

    return (
        <OnboardingLayout>
            <h1>Your details</h1>
            <form onSubmit={onSubmit}>
                <HookedTextField
                    name="phoneNumber"
                    control={control}
                    error={errors.phoneNumber?.message}
                    placeholder="Phone Number"
                    type="number"
                />
                <Autocomplete
                    label="Your Club"
                    name="club"
                    defaultValue={club ?? ''}
                    register={register}
                    clearErrors={clearErrors}
                    options={clubs}
                    error={errors.club?.message}
                />
                <HookedTextField
                    name="membership"
                    control={control}
                    error={errors.membership?.message}
                    select
                >
                    {coachMembershipOptions.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
            </form>
        </OnboardingLayout>
    );
}

export default CoachDetails;
