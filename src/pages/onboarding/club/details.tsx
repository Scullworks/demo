import { MenuItem } from '@mui/material';
import {
    AddressAutocomplete,
    HookedTextField,
    HookedTimeField,
    OnboardingLayout
} from '@/components';
import { useClubDetails } from '@/hooks/pages';
import { Option } from '@/models';

const cancellationOptions: Option[] = [
    { id: '942c6288-d3a0-4f0d-b6d8-2fd1251ec0c7', value: '12 hours notice' },
    { id: '8caa6a7b-0f2e-42e5-a81d-fe1531520af3', value: '24 hours notice' },
    { id: 'eb1d0c12-a290-4291-a16b-2de28bbe2940', value: '48 hours notice' },
    { id: 'a2275a00-e866-4ad9-8f7f-fc7d74b25cef', value: '3 days notice' },
    { id: '886c3cc3-c198-4eac-a534-16c881227eec', value: '4 days notice' },
    { id: '70541e3f-0ba3-429f-9f7e-1cc15639f19f', value: '5 days notice' },
    { id: 'ac17e7c1-e20b-4ff8-a082-39ae8b31e20e', value: '6 days notice' },
    { id: 'b024ec97-ae1a-4fe5-b082-695b75f0b1b5', value: '1 week notice' }
];

function ClubDetails() {
    const { addressPlaceType, onSubmit, control, errors, register } = useClubDetails();

    return (
        <OnboardingLayout>
            <h1>Club Details</h1>
            <form className="onboarding__form" onSubmit={onSubmit}>
                <div className="onboarding-club__opening-hours">
                    <HookedTimeField
                        name="openingTime"
                        label="Opening Time"
                        control={control}
                        error={errors.openingTime?.message}
                    />
                    <HookedTimeField
                        name="closingTime"
                        label="Closing Time"
                        control={control}
                        error={errors.closingTime?.message}
                    />
                </div>
                <HookedTextField
                    name="cancellationPolicy"
                    control={control}
                    error={errors.cancellationPolicy?.message}
                    placeholder="Cancellation Policy"
                    select
                >
                    {cancellationOptions.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
                <AddressAutocomplete
                    name="address"
                    defaultValue={addressPlaceType ?? null}
                    register={register}
                    error={errors?.address?.message}
                />
                <HookedTextField
                    name="phoneNumber"
                    control={control}
                    error={errors.phoneNumber?.message}
                    placeholder="Phone Number"
                />
            </form>
        </OnboardingLayout>
    );
}

export default ClubDetails;
