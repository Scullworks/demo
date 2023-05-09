import { PageTitle, ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';
import { FirebaseAthlete } from '@/models';

function AthleteDashboard() {
    const { sessions, ...calendarProps } = useDashboard<FirebaseAthlete>();

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
