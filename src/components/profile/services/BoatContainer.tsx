import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import { useNestedCollectionsQuery } from '@/hooks/queries';
import { FirebaseBoat } from '@/models';

function BoatContainer() {
    const { data } = useNestedCollectionsQuery('boats');
    const boats = data as unknown as FirebaseBoat[];

    const router = useRouter();

    function onClick() {
        router.push('services/boats/add');
    }

    return (
        <>
            <h2>Boats</h2>
            <div className="profile-services__boats-container">
                <FormControl>
                    <InputLabel id="boats">Your Boats</InputLabel>
                    <Select labelId="boats" label="Your Boats" color="info">
                        {boats?.map(boat => (
                            <MenuItem value={boat.name} key={boat.id}>
                                {boat.name} ({boat.make})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <button className="profile-services__button button__static" onClick={onClick}>
                Add Boat
            </button>
        </>
    );
}

export default BoatContainer;
