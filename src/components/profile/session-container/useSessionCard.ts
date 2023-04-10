import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/store';
import { FirebaseClub, FirebaseSession, UserType } from '@/models';
import { database } from '@/services/firebase';

interface UseSessionCardProps {
    readonly session: FirebaseSession;
    readonly club: FirebaseClub | undefined;
    readonly as: UserType;
    readonly refetch: <TPageData>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>
    ) => Promise<QueryObserverResult>;
}

export function useSessionCard(props: UseSessionCardProps) {
    const { session, club, as: userType, refetch } = props;
    const [buttonText, setButtonText] = useState('');
    const currentUser = useAuthStore(state => state.user);

    function onClick(session: FirebaseSession) {
        if (userType === 'club') deleteSession(session.id);
        if (userType === 'coach' && session.coach?.id === currentUser?.uid) {
            deleteSession(session.id);
        }
    }

    async function deleteSession(sessionId: string) {
        if (!club) return;

        try {
            const sessionRef = doc(database, 'clubs', club.id, 'sessions', sessionId);
            await deleteDoc(sessionRef);
            refetch();
        } catch (error) {
            console.error('Delete Session Error: ', error.message);
        }
    }

    useEffect(() => {
        if (userType === 'athlete') setButtonText('Attend Session');
        if (userType === 'club') setButtonText('Cancel Session');
        if (userType === 'coach' && session.coach?.id === currentUser?.uid) {
            setButtonText('Cancel Session');
        }
    }, [userType, setButtonText, session.coach?.id, currentUser?.uid]);

    return {
        buttonText,
        onClick
    };
}
