import { PageTitle, ProfileLayout, SessionCalendar, SessionContainer } from '@/components';
import { useDashboard } from '@/hooks/pages/profile/useDashboard';
import { FirebaseClub } from '@/models';

function ClubDashboard() {
    const { sessions, ...calendarProps } = useDashboard<FirebaseClub>();

    return (
        <>
            <PageTitle text="Dashboard" />
            <ProfileLayout for="clubs">
                <div className="profile-dashboard">
                    <SessionCalendar {...calendarProps} />
                    <SessionContainer as="clubs" sessions={sessions} />
                </div>
            </ProfileLayout>
        </>
    );
}

export default ClubDashboard;
