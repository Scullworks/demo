import { PageTitle, ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';

function AthleteDashboard() {
    const { sessions, ...calendarProps } = useDashboard('athletes');

    return (
        <ProfileLayout for="athletes">
            <PageTitle text="Profile" />
            <div className="profile-dashboard">
                <SessionCalendar {...calendarProps} />
                <SessionContainer as="athletes" sessions={sessions} />
            </div>
        </ProfileLayout>
    );
}

export default AthleteDashboard;
