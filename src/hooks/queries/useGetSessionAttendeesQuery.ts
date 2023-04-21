import { useQuery } from '@tanstack/react-query';
import { CollectionName, FirebaseSession } from '@/models';
import { getAttendeesFromFirebase } from '@/services/firebase';
import { useEnsureFirebaseDocQuery } from './useEnsureFirebaseDocQuery';

export function useGetSessionAttendeesQuery(
    session: FirebaseSession,
    collectionName: CollectionName
) {
    const { data: doc } = useEnsureFirebaseDocQuery(collectionName);

    const { data } = useQuery({
        queryKey: ['attendees', session.id],
        queryFn: () => getAttendeesFromFirebase(session.clubId, session.id),
        enabled: doc !== undefined
    });

    const isAthlete = collectionName === 'athletes';
    const isInSession =
        data?.attendees?.find(attendee => attendee.athleteId === doc?.uid) !== undefined;

    return {
        attendees: data?.attendees ?? null,
        isAttending: isAthlete && isInSession
    };
}
