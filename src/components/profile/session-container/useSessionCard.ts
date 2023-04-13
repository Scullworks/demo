import { useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { useAuthStore } from '@/hooks/store';
import { CollectionName, FirebaseSession } from '@/models';
import { database } from '@/services/firebase';

interface UseSessionCardProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
}

export function useSessionCard(props: UseSessionCardProps) {
    const { session, as: userType } = props;

    const [buttonText, setButtonText] = useState('');
    const currentUser = useAuthStore(state => state.user);

    const queryClient = useQueryClient();
    const { data } = useEnsureFirebaseDocQuery(userType);

    function onClick(session: FirebaseSession) {
        if (userType === 'clubs') deleteSession(session.id);
        if (userType === 'coaches' && session.coach?.id === currentUser?.uid) {
            deleteSession(session.id);
        }
    }

    async function deleteSession(sessionId: string) {
        if (!data) return;

        try {
            const sessionRef = doc(database, 'clubs', data.id, 'sessions', sessionId);
            await deleteDoc(sessionRef);
            await queryClient.refetchQueries({ queryKey: ['club', 'sessions'] });
        } catch (error) {
            console.error('Delete Session Error: ', error.message);
        }
    }

    useEffect(() => {
        if (userType === 'athletes') setButtonText('Attend Session');
        if (userType === 'clubs') setButtonText('Cancel Session');
        if (userType === 'coaches' && session.coach?.id === currentUser?.uid) {
            setButtonText('Cancel Session');
        }
    }, [userType, setButtonText, session.coach?.id, currentUser?.uid]);

    return {
        buttonText,
        onClick
    };
}
