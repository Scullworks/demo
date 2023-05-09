import { useQuery } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFirebaseDocStore } from '@/hooks/store';
import { FirebaseAthlete } from '@/models';
import { createDoc } from '@/services/firebase';
import { axiosInstance } from '@/services/stripe/utils';

export function useCheckoutSuccess() {
    const sessionJson = typeof window !== 'undefined' && localStorage.getItem('session');
    const session = sessionJson ? JSON.parse(sessionJson) : undefined;

    const router = useRouter();
    const stripeSessionId = router.query.sessionId;

    async function getSessionPaymentId() {
        try {
            const { data } = await axiosInstance(`/sessions/${stripeSessionId}`);
            return data;
        } catch (error) {
            console.error('Get Session Details Error: ', error.message);
        }
    }

    const data = useFirebaseDocStore(state => state.data);
    const athlete = data as FirebaseAthlete | null;

    const { data: paymentId } = useQuery<string>({
        queryKey: ['stripe-session-id', stripeSessionId],
        queryFn: getSessionPaymentId,
        enabled: stripeSessionId !== undefined
    });

    const clubId = athlete?.club.id as string;

    useQuery({
        enabled: (athlete && paymentId && session) !== undefined,
        queryKey: ['add-attendee'],
        queryFn: () =>
            createDoc(clubId, 'attendees', {
                sessionId: session?.id ?? '',
                sessionType: session?.type ?? '',
                sessionDate: session?.date as Timestamp,
                sessionPaymentId: paymentId ?? '',
                athleteId: athlete?.uid ?? '',
                athleteName: athlete?.name ?? '',
                profileImageRef: athlete?.profileImageRef ?? ''
            })
    });

    function onBackToDashboardClick() {
        router.push('/profile/athlete');
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.removeItem('session');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return {
        onBackToDashboardClick
    };
}
