import { BoatContainer, ClubProfileLayout, ServiceContainer } from '@/components';

function ClubServices() {
    return (
        <ClubProfileLayout>
            <div className="profile-services">
                <ServiceContainer />
                <BoatContainer />
            </div>
        </ClubProfileLayout>
    );
}

export default ClubServices;
