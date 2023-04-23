import { AvatarGroup, Avatar as MuiAvatar } from '@mui/material';
import { SessionAttendee } from '@/models';

interface SessionAttendeesProps {
    readonly attendees: SessionAttendee[] | null;
    readonly isAthlete: boolean;
}

function SessionAttendees(props: SessionAttendeesProps) {
    const { attendees, isAthlete } = props;

    if (isAthlete) return <></>;

    if (!attendees?.length) {
        return <p className="profile-session-card__no-attendees">No athletes have booked yet</p>;
    }

    return (
        <>
            <p className="profile-session-card__attendees">Athletes Attending:</p>
            <AvatarGroup max={4} total={attendees?.length}>
                {attendees?.map(attendee =>
                    attendee.profileImageRef ? (
                        <MuiAvatar
                            key={attendee.athleteId}
                            src={attendee.profileImageRef}
                            alt={attendee.athleteName}
                        />
                    ) : (
                        <MuiAvatar key={attendee.athleteId} alt={attendee.athleteName}>
                            {attendee.athleteName.charAt(0) +
                                attendee.athleteName.split(' ')[1].charAt(0) ?? ''}
                        </MuiAvatar>
                    )
                )}
            </AvatarGroup>
        </>
    );
}

export default SessionAttendees;
