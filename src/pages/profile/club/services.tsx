import { BoatContainer, ProfileLayout, ServiceContainer } from '@/components';

function ClubServices() {
    return (
        <ProfileLayout for="clubs">
            <div className="profile-services">
                <ServiceContainer />
                <BoatContainer />
            </div>
        </ProfileLayout>
    );
}

export default ClubServices;
