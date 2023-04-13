import { AthleteTable, ProfileLayout } from '@/components';

function ClubAthletes() {
    return (
        <ProfileLayout for="clubs">
            <div className="profile-athletes">
                <AthleteTable />
            </div>
        </ProfileLayout>
    );
}

export default ClubAthletes;
