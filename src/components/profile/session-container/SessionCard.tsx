import { AvatarGroup, Avatar as MuiAvatar } from '@mui/material';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Avatar } from '@/components';
import { FirebaseClub, FirebaseSession, UserType } from '@/models';
import { useSessionCard } from './useSessionCard';

interface SessionCardProps {
    readonly session: FirebaseSession;
    readonly club: FirebaseClub | undefined;
    readonly as: UserType;
    readonly refetch: <TPageData>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>
    ) => Promise<QueryObserverResult>;
}

function SessionCard(props: SessionCardProps) {
    const { session } = props;
    const { buttonText, onClick } = useSessionCard({ ...props });

    return (
        <div className="profile-session-card" key={session.id}>
            {session.coach ? (
                <>
                    <Avatar
                        name={session.coach.name ?? null}
                        profileImage={session.coach.profileImageRef}
                    />
                    <p className="profile-session-card__price">${formatPrice(session.price)}</p>
                    <h3 className="profile-session-card__heading">{session.type}</h3>
                    <p className="profile-session-card__coach">Coach {session.coach.name}</p>
                </>
            ) : (
                <>
                    <h3 className="profile-session-card__heading">{session.type}</h3>
                    <p className="profile-session-card__price">${formatPrice(session.price)}</p>
                </>
            )}
            <p className="profile-session-card__date">
                {dayjs(session.date.toDate()).format('MMMM Do YYYY')}
            </p>
            <p className="profile-session-card__time">{session.time}</p>
            {session.attendees && (
                <>
                    <p className="profile-session-card__attendees">Athletes Attending:</p>
                    {/* TODO: Replace with actual functionality, after athlete dashboard implementation */}
                    <AvatarGroup max={4} total={6}>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                        <MuiAvatar alt="John Doe">JD</MuiAvatar>
                    </AvatarGroup>
                </>
            )}
            <button className="button__static" onClick={() => onClick(session)}>
                {buttonText}
            </button>
        </div>
    );
}

export default SessionCard;

function formatPrice(price: number) {
    const priceSplit = String(price).split('.');
    const cents = priceSplit[1];

    if (cents?.length === 1) {
        return price + '0';
    } else {
        return price.toString();
    }
}
