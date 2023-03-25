import {
    AddressAutocomplete,
    Autocomplete,
    AutocompleteOption,
    HookedTextField,
    HookedTimeField,
    OnboardingLayout
} from '@/components';
import { useClubDetails } from '@/hooks/pages';

const cancellationOptions: AutocompleteOption[] = [
    { id: '8caa6a7b-0f2e-42e5-a81d-fe1531520af3', name: '24 hours notice' },
    { id: 'eb1d0c12-a290-4291-a16b-2de28bbe2940', name: '2 days notice' },
    { id: 'a2275a00-e866-4ad9-8f7f-fc7d74b25cef', name: '3 days notice' },
    { id: '886c3cc3-c198-4eac-a534-16c881227eec', name: '4 days notice' },
    { id: '70541e3f-0ba3-429f-9f7e-1cc15639f19f', name: '5 days notice' },
    { id: 'ac17e7c1-e20b-4ff8-a082-39ae8b31e20e', name: '6 days notice' },
    { id: 'b024ec97-ae1a-4fe5-b082-695b75f0b1b5', name: '1 week notice' }
];

function ClubDetails() {
    const { onSubmit, control, errors, register, clearErrors } = useClubDetails();

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s operating hours and policies</h1>
            <form className="onboarding-club__form" onSubmit={onSubmit}>
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
                <Autocomplete
                    label="Cancellation Policy"
                    name="cancellationPolicy"
                    register={register}
                    clearErrors={clearErrors}
                    options={cancellationOptions}
                    error={errors.cancellationPolicy?.message}
                />
                <AddressAutocomplete
                    name="address"
                    register={register}
                    error={errors?.address?.message}
                />
                <HookedTextField
                    name="phoneNumber"
                    control={control}
                    error={errors.phoneNumber?.message}
                    type="number"
                    placeholder="Phone Number"
                />
            </form>
        </OnboardingLayout>
    );
}

export default ClubDetails;
