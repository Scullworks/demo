import { MenuItem } from '@mui/material';
import { HookedTextField, ProfileLayout, SnackbarAlert } from '@/components';
import { useAddBoat } from '@/hooks/pages';
import { Option } from '@/models';

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

function AddBoats() {
    const { showAlert, setShowAlert, control, errors, onSubmit } = useAddBoat();

    return (
        <ProfileLayout for="clubs">
            <div className="profile-services-boats">
                <h1>Add the boats available at your club</h1>
                <form className="profile-services-form" onSubmit={onSubmit}>
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
                    <button className="button__static" type="submit">
                        Add Boat
                    </button>
                </form>

                <SnackbarAlert
                    text="Boat was added successfully"
                    severity="success"
                    hideCloseButton
                    open={showAlert}
                    setOpen={setShowAlert}
                />
            </div>
        </ProfileLayout>
    );
}

export default AddBoats;
