import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import { useFirebaseDocStore } from '@/hooks/store';
import { FirebaseClub } from '@/models';

function ServiceContainer() {
    const data = useFirebaseDocStore(state => state.data);
    const club = data as FirebaseClub | null;
    const services = club?.services.map(service => ({ id: uuid(), value: service }));

    const router = useRouter();

    function onClick() {
        router.push('services/create');
    }

    return (
        <>
            <h2>Services</h2>
            <div className="profile-services__services-container">
                <FormControl>
                    <InputLabel id="services">Your Services</InputLabel>
                    <Select labelId="services" label="Your Services" color="info" defaultValue="">
                        {services?.map(service => (
                            <MenuItem value={service.value} key={service.id}>
                                {service.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <button className="profile-services__button button__static" onClick={onClick}>
                Add Service
            </button>
        </>
    );
}

export default ServiceContainer;
