import dayjs from 'dayjs';
import { useGetSessionAttendeesQuery } from '@/hooks/queries';
import { CollectionName, FirebaseSession } from '@/models';
import SessionAttendees from './SessionAttendees';
import SessionCardButton from './SessionCardButton';
import SessionCardHeader from './SessionCardHeader';

interface SessionCardProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
}

function SessionCard(props: SessionCardProps) {
    const { session, as: collectionName } = props;

    const isAthlete = collectionName === 'athletes';

    const { attendees, isAttending } = useGetSessionAttendeesQuery(session, collectionName);

    return (
        <div className="profile-session-card" key={session.id}>
            <SessionCardHeader session={session} />
            <p className="profile-session-card__date">
                {dayjs(session.date.toDate()).format('MMMM Do YYYY')}
            </p>
            <p className="profile-session-card__time">{session.time}</p>
            <SessionAttendees attendees={attendees} isAthlete={isAthlete} />
            <SessionCardButton
                as={collectionName}
                session={session}
                isAthlete={isAthlete}
                isAttending={isAttending}
            />
        </div>
    );
}

export default SessionCard;
