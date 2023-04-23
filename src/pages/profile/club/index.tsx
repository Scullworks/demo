import { ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';

function ClubDashboard() {
    const { sessions, ...calendarProps } = useDashboard('clubs');

    return (
        <ProfileLayout for="clubs">
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer as="clubs" sessions={sessions} />
            </div>
        </ProfileLayout>
    );
}

export default ClubDashboard;
