import { MenuItem } from '@mui/material';
import { HookedTextField, OnboardingLayout, SnackbarAlert } from '@/components';
import { useBoats } from '@/hooks/pages';
import { BoatSize } from '@/hooks/store';

interface BoatSizeOption {
    readonly id: number;
    readonly value: BoatSize;
}

const boatSizes: BoatSizeOption[] = [
    { id: 1, value: '8+' },
    { id: 2, value: '4+' },
    { id: 3, value: '4-' },
    { id: 4, value: '4x' },
    { id: 5, value: '2+' },
    { id: 6, value: '2-' },
    { id: 7, value: '2x' },
    { id: 8, value: '1x' }
];

function Boats() {
    const { onSubmit, control, errors, addBoatToStore, boats, showAlert, setShowAlert } =
        useBoats();

    return (
        <OnboardingLayout>
            <h1>Your club&apos;s boats</h1>
            <form className="onboarding-club__form" onSubmit={onSubmit}>
                <HookedTextField
                    name="boatSize"
                    placeholder="Boat Size"
                    control={control}
                    error={errors.boatSize?.message}
                    select
                >
                    {boatSizes.map(boat => (
                        <MenuItem key={boat.id} value={boat.value}>
                            {boat.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
                <HookedTextField
                    name="boatMake"
                    placeholder="Boat Make"
                    control={control}
                    error={errors.boatMake?.message}
                />
                <HookedTextField
                    name="boatName"
                    placeholder="Boat Name"
                    control={control}
                    error={errors.boatName?.message}
                />
                <button
                    className="onboarding-club__boats-button"
                    type="button"
                    onClick={() => addBoatToStore()()}
                >
                    Add Boat
                </button>

                {/* Boats */}
                <div className="onboarding-club__boats-names">
                    {boats.map(boat => (
                        <p key={boat.name}>{boat.name}</p>
                    ))}
                </div>
            </form>

            <SnackbarAlert
                text="Please add at least one boat"
                severity="error"
                hideCloseButton
                open={showAlert}
                setOpen={setShowAlert}
            />
        </OnboardingLayout>
    );
}

export default Boats;
