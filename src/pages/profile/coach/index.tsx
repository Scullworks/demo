import { PageTitle, ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';
import { FirebaseCoach } from '@/models';

function CoachDashboard() {
    const { sessions, ...calendarProps } = useDashboard<FirebaseCoach>();

    return (
        <ProfileLayout for="coaches">
            <PageTitle text="Profile" />
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer as="coaches" sessions={sessions} />
            </div>
        </ProfileLayout>
    );
}

export default CoachDashboard;
