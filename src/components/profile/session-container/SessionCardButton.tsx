import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { CollectionName, FirebaseSession } from '@/models';
import { useSessionCard } from './useSessionCard';

interface SessionCardButtonProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
    readonly isAttending: boolean;
    readonly isAthlete: boolean;
}

function SessionCardButton(props: SessionCardButtonProps) {
    const { isAttending, isAthlete, ...sessionCardProps } = props;
    const [redirecting, setRedirecting] = useState(false);

    const { isSessionCoach, onClick } = useSessionCard({ ...sessionCardProps });

    function onPayForSessionClick() {
        setRedirecting(true);
        onClick();
    }

    if (isAthlete && isAttending) {
        return (
            <button className="'profile-session-card__button--athlete' button__static">
                Already Attending
            </button>
        );
    }

    if (isAthlete) {
        return (
            <button
                className="'profile-session-card__button--athlete' button__static"
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

    if (!isSessionCoach) {
        return <></>;
    }

    return (
        <button className="profile-session-card__button button__static" onClick={onClick}>
            Cancel Session
        </button>
    );
}

export default SessionCardButton;
