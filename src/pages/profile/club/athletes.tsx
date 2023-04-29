import { AthleteTable, PageTitle, ProfileLayout } from '@/components';

function ClubAthletes() {
    return (
        <>
            <PageTitle text="Athletes" />
            <ProfileLayout for="clubs">
                <div className="profile-athletes">
                    <AthleteTable />
                </div>
            </ProfileLayout>
        </>
    );
}

export default ClubAthletes;
