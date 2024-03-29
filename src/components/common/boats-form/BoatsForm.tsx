import { MenuItem } from '@mui/material';
import { BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { HookedTextField, SnackbarAlert } from '@/components';
import { BoatValues } from '@/hooks/pages';
import { Boat, Option } from '@/models';

const boatSizes: Option[] = [
    { id: 'fc0b6c32-1435-44ee-892c-413491845e48', value: '8+' },
    { id: '8619e88f-7f06-4c87-9cc3-0249d256d7b0', value: '4+' },
    { id: '04ef6fd1-dd74-4c9e-ba8e-e2f6ad954dc3', value: '4-' },
    { id: '4285b556-50ca-4642-b73a-80250f6cea88', value: '4x' },
    { id: 'b69c0852-adec-437b-9f80-6af39df2d3df', value: '2+' },
    { id: '0e6b5282-c0c1-4443-a535-3eb98c564c0d', value: '2-' },
    { id: '7c916ee3-bfe4-4a14-af1e-39028c80cae3', value: '2x' },
    { id: '9e96f607-3ac4-41cc-a0ac-7169b989022b', value: '1x' }
];

interface BoatsFormProps {
    readonly boats: Boat[];
    readonly boatCountText: string;
    readonly showAlert: boolean;
    readonly isMobilePhone: boolean;
    readonly control: Control<BoatValues>;
    readonly errors: FieldErrors<BoatValues>;
    readonly setShowAlert: Dispatch<SetStateAction<boolean>>;
    readonly addBoatToStore: () => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        e?: BaseSyntheticEvent<object, any, any> | undefined
    ) => Promise<void>;
}

function BoatsForm(props: BoatsFormProps) {
    const {
        boats,
        boatCountText,
        showAlert,
        isMobilePhone,
        control,
        errors,
        setShowAlert,
        addBoatToStore
    } = props;

    return (
        <form className="onboarding__form">
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
            {isMobilePhone ? (
                <p className="onboarding-club__boats-added">{boatCountText}</p>
            ) : (
                <div className="onboarding-club__boats-names">
                    {boats.map(boat => (
                        <p key={boat.name}>{boat.name}</p>
                    ))}
                </div>
            )}

            {/* Alert */}
            <SnackbarAlert
                text="Please add at least one boat"
                severity="error"
                hideCloseButton
                open={showAlert}
                setOpen={setShowAlert}
            />
        </form>
    );
}

export default BoatsForm;
