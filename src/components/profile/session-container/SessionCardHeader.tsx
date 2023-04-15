import { Avatar } from '@/components';
import { FirebaseSession } from '@/models';

interface SessionCardHeaderProps {
    readonly session: FirebaseSession;
}

function SessionCardHeader({ session }: SessionCardHeaderProps) {
    return (
        <>
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
        </>
    );
}

export default SessionCardHeader;

function formatPrice(price: number) {
    const priceSplit = String(price).split('.');
    const cents = priceSplit[1];

    if (cents?.length === 1) {
        return price + '0';
    } else {
        return price.toString();
    }
}
