import { AvatarGroup, Avatar as MuiAvatar } from '@mui/material';
import { SessionAttendee } from '@/models';

interface SessionAttendeesProps {
    readonly attendees: SessionAttendee[] | null;
}

function SessionAttendees({ attendees }: SessionAttendeesProps) {
    return (
        <>
            {attendees ? (
                <>
                    <p className="profile-session-card__attendees">Athletes Attending:</p>
                    <AvatarGroup max={4} total={attendees?.length}>
                        {attendees.map(attendee =>
                            attendee.profileImageRef ? (
                                <MuiAvatar
                                    key={attendee.id}
                                    src={attendee.profileImageRef}
                                    alt={attendee.name}
                                />
                            ) : (
                                <MuiAvatar key={attendee.id} alt={attendee.name}>
                                    {attendee.name}
                                </MuiAvatar>
                            )
                        )}
                    </AvatarGroup>
                </>
            ) : (
                <p className="profile-session-card__no-attendees">No athletes have booked yet</p>
            )}
        </>
    );
}

export default SessionAttendees;
