import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { CollectionName, FirebaseSession } from '@/models';
import { useSessionCard } from './useSessionCard';

interface SessionCardButtonProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
    readonly isAttending: boolean;
}

function SessionCardButton(props: SessionCardButtonProps) {
    const { isAttending, as: collectionName, session } = props;
    const [redirecting, setRedirecting] = useState(false);

    const { onClick, isSessionCoach } = useSessionCard({ as: collectionName, session });

    const isAthlete = collectionName === 'athletes';
    const isCoach = collectionName === 'coaches';

    function onPayForSessionClick() {
        setRedirecting(true);
        onClick();
    }

    if (isSessionCoach) {
        return (
            <button className="profile-session-card__button--athlete success button__static">
                You&apos;re coaching
            </button>
        );
    }

    if (isCoach) return <></>;

    if (isAthlete && isAttending) {
        return (
            <button className="profile-session-card__button--athlete success button__static">
                Already Attending
            </button>
        );
    }

    if (isAthlete) {
        return (
            <button
                className="profile-session-card__button--athlete button__static"
                onClick={onPayForSessionClick}
            >
                {redirecting ? (
                    <PulseLoader color="rgb(256, 256, 256)" size={10} />
                ) : (
                    'Attend Session'
                )}
            </button>
        );
    }

    return (
        <button className="profile-session-card__button button__static" onClick={onClick}>
            Cancel Session
        </button>
    );
}

export default SessionCardButton;
