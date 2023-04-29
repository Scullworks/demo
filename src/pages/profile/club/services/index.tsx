import { BoatContainer, PageTitle, ProfileLayout, ServiceContainer } from '@/components';

function ClubServices() {
    return (
        <>
            <PageTitle text="Your Services" />
            <ProfileLayout for="clubs">
                <div className="profile-services">
                    <ServiceContainer />
                    <BoatContainer />
                </div>
            </ProfileLayout>
        </>
    );
}

export default ClubServices;
