import { ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';

function CoachDashboard() {
    const { sessions, ...calendarProps } = useDashboard('coaches');

    return (
        <ProfileLayout for="coaches">
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer as="coaches" sessions={sessions} />
            </div>
        </ProfileLayout>
    );
}

export default CoachDashboard;
