import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useDateStore } from '@/hooks/store';
import { FirebaseClub, FirebaseSession, UserType } from '@/models';
import SessionCard from './SessionCard';

dayjs.extend(advancedFormat);

interface SessionContainerProps {
    readonly sessions: FirebaseSession[] | null | undefined;
    readonly club: FirebaseClub | undefined;
    readonly refetch: <TPageData>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>
    ) => Promise<QueryObserverResult>;
}

function SessionContainer(props: SessionContainerProps) {
    const { sessions, club, refetch } = props;
    const selectedDate = useDateStore(state => state.date);
    const [filteredSessions, setFilteredSessions] = useState<FirebaseSession[] | null | undefined>(
        null
    );

    const router = useRouter();
    const userType = router.asPath.split('/')[2] as UserType;

    useEffect(() => {
        const sessionsForSelectedDate = sessions?.filter(session => {
            const sessionDate = dayjs(session.date.toDate()).format('MM/DD/YYYY');
            const formattedSelectedDate = dayjs(selectedDate).format('MM/DD/YYYY');
            return sessionDate === formattedSelectedDate;
        });

        setFilteredSessions(sessionsForSelectedDate);
    }, [sessions, selectedDate]);

    if (!filteredSessions?.length)
        return (
            <p className="profile-session__no-sessions">
                There are no available sessions on this date
            </p>
        );

    return (
        <div className="profile-session-container">
            {userType &&
                filteredSessions?.map(session => (
                    <SessionCard
                        as={userType}
                        session={session}
                        club={club}
                        key={session.id}
                        refetch={refetch}
                    />
                ))}
        </div>
    );
}

export default SessionContainer;
