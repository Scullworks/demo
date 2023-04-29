import { OnboardingLayout, PageTitle, ProfileInfo } from '@/components';

function Profile() {
    return (
        <>
            <PageTitle text="Basic Details" />
            <OnboardingLayout>
                <h1>Club Name and Logo</h1>
                <ProfileInfo />
            </OnboardingLayout>
        </>
    );
}

export default Profile;
