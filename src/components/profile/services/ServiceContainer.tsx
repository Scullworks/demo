import { v4 as uuid } from 'uuid';
import { useEnsureClubDataQuery } from '@/hooks/queries/useEnsureClubDataQuery';

function ServiceContainer() {
    const { club } = useEnsureClubDataQuery();
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
