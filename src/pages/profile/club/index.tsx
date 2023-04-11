import { ClubProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';

function ClubDashboard() {
    const { sessions, ...calendarProps } = useDashboard();

    return (
        <ClubProfileLayout>
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer sessions={sessions} />
            </div>
        </ClubProfileLayout>
    );
}

export default ClubDashboard;
