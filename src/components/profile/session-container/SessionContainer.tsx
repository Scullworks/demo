import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useEffect, useState } from 'react';
import { useDateStore } from '@/hooks/store';
import { CollectionName, FirebaseSession } from '@/models';
import SessionCard from './SessionCard';

dayjs.extend(advancedFormat);

interface SessionContainerProps {
    readonly sessions: FirebaseSession[] | null | undefined;
    readonly as: CollectionName;
}

function SessionContainer(props: SessionContainerProps) {
    const { as: collectionName, sessions } = props;
    const selectedDate = useDateStore(state => state.date);
    const [filteredSessions, setFilteredSessions] = useState<FirebaseSession[] | null | undefined>(
        null
    );

    const singleSession = filteredSessions?.length === 1;

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
        <div className={`profile-session-container ${singleSession ? 'single-child' : ''}`}>
            {collectionName &&
                filteredSessions?.map(session => (
                    <SessionCard as={collectionName} session={session} key={session.id} />
                ))}
        </div>
    );
}

export default SessionContainer;
