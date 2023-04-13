import { v4 as uuid } from 'uuid';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { FirebaseClub } from '@/models';

function ServiceContainer() {
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');
    const services = club?.services.map(service => ({ id: uuid(), value: service }));

    return (
        <>
            <h2>Services</h2>
            <div className="profile-services__services-container">
                {services?.map(service => (
                    <div className="profile-services__service" key={service.id}>
                        <span>{service.value}</span>
                    </div>
                ))}
            </div>
            <button className="profile-services__button button__static">Add Service</button>
        </>
    );
}

export default ServiceContainer;
