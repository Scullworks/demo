import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFirebaseDocStore } from '@/hooks/store';
import { CollectionName, FirebaseSession } from '@/models';
import { getAttendeesFromFirebase } from '@/services/firebase';

export function useGetSessionAttendeesQuery(
    session: FirebaseSession,
    collectionName: CollectionName
) {
    const doc = useFirebaseDocStore(state => state.data);
    const [enabled, setEnabled] = useState(false);

    if (doc && !enabled) setEnabled(true);

    const { data } = useQuery({
        queryKey: ['attendees', session.id],
        queryFn: () => getAttendeesFromFirebase(session.clubId, session.id),
        enabled
    });

    const isAthlete = collectionName === 'athletes';
    const isInSession =
        data?.attendees?.find(attendee => attendee.athleteId === doc?.uid) !== undefined;

    return {
        attendees: data?.attendees ?? null,
        isAttending: isAthlete && isInSession
    };
}
