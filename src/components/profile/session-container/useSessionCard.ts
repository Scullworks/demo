import { useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useEnsureClubDataQuery } from '@/hooks/queries/useEnsureClubDataQuery';
import { useAuthStore } from '@/hooks/store';
import { FirebaseSession, UserType } from '@/models';
import { database } from '@/services/firebase';

interface UseSessionCardProps {
    readonly session: FirebaseSession;
    readonly as: UserType;
}

export function useSessionCard(props: UseSessionCardProps) {
    const { session, as: userType } = props;

    const [buttonText, setButtonText] = useState('');
    const currentUser = useAuthStore(state => state.user);

    const queryClient = useQueryClient();
    const { club } = useEnsureClubDataQuery();

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
            await queryClient.refetchQueries({ queryKey: ['club', 'sessions'] });
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
