import { OnboardingLayout, PageTitle, ProfileInfo } from '@/components';

function Profile() {
    return (
        <>
            <PageTitle text="Basic Details" />
            <OnboardingLayout>
                <h1>Your Name and Image</h1>
                <ProfileInfo />
            </OnboardingLayout>
        </>
    );
}

export default Profile;
