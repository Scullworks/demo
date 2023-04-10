import { ClubProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';
import { useClubDataQuery } from '@/hooks/queries';

function ClubDashboard() {
    const { club } = useClubDataQuery();

    const { sessions, refetch, ...calendarProps } = useDashboard({ club });

    return (
        <ClubProfileLayout club={club}>
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer sessions={sessions} club={club} refetch={refetch} />
            </div>
        </ClubProfileLayout>
    );
}

export default ClubDashboard;
