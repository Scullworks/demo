import dayjs from 'dayjs';
import { CollectionName, FirebaseSession } from '@/models';
import SessionAttendees from './SessionCardAttendees';
import SessionCardHeader from './SessionCardHeader';
import { useSessionCard } from './useSessionCard';

interface SessionCardProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
}

function SessionCard(props: SessionCardProps) {
    const { session, as: collectionName } = props;
    const { buttonText, onClick } = useSessionCard(props);
    const isAthlete = collectionName === 'athletes';

    return (
        <div className="profile-session-card" key={session.id}>
            <SessionCardHeader session={session} />
            <p className="profile-session-card__date">
                {dayjs(session.date.toDate()).format('MMMM Do YYYY')}
            </p>
            <p className="profile-session-card__time">{session.time}</p>
            <SessionAttendees attendees={session.attendees} />
            <button
                className={`profile-session-card__button ${
                    isAthlete && 'profile-session-card__button--athlete'
                } button__static`}
                onClick={() => onClick(session)}
            >
                {buttonText}
            </button>
        </div>
    );
}

export default SessionCard;
