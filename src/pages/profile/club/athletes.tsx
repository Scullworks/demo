import { AthleteTable, ClubProfileLayout } from '@/components';

function ClubAthletes() {
    return (
        <ClubProfileLayout>
            <div className="profile-athletes">
                <AthleteTable />
            </div>
        </ClubProfileLayout>
    );
}

export default ClubAthletes;
