import { MenuItem } from '@mui/material';
import { Autocomplete, HookedTextField, OnboardingLayout, Option } from '@/components';
import { useAthleteMembership } from '@/hooks/pages';
import { AthleteMembershipType, PositionPreference } from '@/hooks/store';

const athleteMembershipOptions: Option<AthleteMembershipType>[] = [
    { id: 'a9a30fbe-488e-41d6-ac5a-9ea6be3457c2', value: 'Member' },
    { id: '639b6dd5-61a0-4ac9-ac46-8358ff73129c', value: 'Guest Rower' },
    { id: '722248e5-9dba-44dd-8417-9877da69559e', value: 'Gear Rental Only' }
];

const positionPreferenceOptions: Option<PositionPreference>[] = [
    { id: 'fc64bafc-33b7-4961-9248-19420954b951', value: 'Port' },
    { id: '0a390cf6-9652-4f69-8638-0e286aa16b32', value: 'Biswpetual' },
    { id: '935dafa4-c5e9-414d-a88c-49900c2a6b00', value: 'Starboard' }
];

function AthleteMembership() {
    const { onSubmit, control, errors, club, register, clearErrors, clubs } =
        useAthleteMembership();

    return (
        <OnboardingLayout>
            <h1>Details about your membership</h1>
            <form className="onboarding__form" onSubmit={onSubmit}>
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
                    name="membershipType"
                    placeholder="Membership Type"
                    control={control}
                    error={errors.membershipType?.message}
                    select
                >
                    {athleteMembershipOptions.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
                <HookedTextField
                    name="positionPreference"
                    placeholder="Position Preference"
                    control={control}
                    error={errors.positionPreference?.message}
                    select
                >
                    {positionPreferenceOptions.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
            </form>
        </OnboardingLayout>
    );
}

export default AthleteMembership;
