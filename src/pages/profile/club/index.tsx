import { ClubProfileLayout, SessionCalendar } from '@/components';
import { useClubDataQuery } from '@/hooks/queries';

function ClubDashboard() {
    const { club } = useClubDataQuery();

    return (
        <ClubProfileLayout club={club}>
            <SessionCalendar club={club} />
        </ClubProfileLayout>
    );
}

export default ClubDashboard;
