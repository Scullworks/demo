import { MenuItem } from '@mui/material';
import { PropagateLoader } from 'react-spinners';
import { Autocomplete, HookedTextField, OnboardingLayout, PageTitle } from '@/components';
import { useCoachDetails } from '@/hooks/pages';
import { useGetClubsQuery } from '@/hooks/queries';
import { CoachMembershipType, Option } from '@/models';

const coachMembershipOptions: Option<CoachMembershipType>[] = [
    { id: '3f269ba5-c4ab-453f-b00b-90239cb81ad7', value: 'Coach' },
    { id: '48755830-29b5-4255-9d75-a58dffaea420', value: 'Guest Coach' }
];

function CoachDetails() {
    const { clubs } = useGetClubsQuery();

    const {
        // eslint-disable-next-line prettier/prettier
        isCreatingAccount,
        onSubmit,
        control,
        errors,
        register,
        clearErrors
    } = useCoachDetails(clubs);

    if (isCreatingAccount) {
        return (
            <>
                <PageTitle text="Further Details" />
                <div className="loading">
                    <PropagateLoader color="rgb(255, 179, 109)" />
                    <p>Please wait while we create your account</p>
                </div>
            </>
        );
    }

    return (
        <>
            <PageTitle text="Further Details" />
            <OnboardingLayout>
                <h1>Your Details</h1>
                <form onSubmit={onSubmit}>
                    <HookedTextField
                        name="phoneNumber"
                        control={control}
                        error={errors.phoneNumber?.message}
                        type="tel"
                        placeholder="Phone Number"
                    />
                    <Autocomplete
                        name="club"
                        label="Your Club"
                        defaultValue=""
                        register={register}
                        clearErrors={clearErrors}
                        options={clubs ?? ([] as Option[])}
                        error={errors.club?.message}
                    />
                    <HookedTextField
                        name="membershipType"
                        control={control}
                        error={errors.membershipType?.message}
                        placeholder="Membership Type"
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
        </>
    );
}

export default CoachDetails;
