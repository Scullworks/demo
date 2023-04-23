import { useQueryClient } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { useAuthStore } from '@/hooks/store';
import { CollectionName, FirebaseAthlete, FirebaseSession } from '@/models';
import { database } from '@/services/firebase';
import { StripeItem, payForStripeSession } from '@/services/stripe';

interface UseSessionCardProps {
    readonly session: FirebaseSession;
    readonly as: CollectionName;
}

export function useSessionCard(props: UseSessionCardProps) {
    const { session, as: userType } = props;

    const currentUser = useAuthStore(state => state.user);

    const queryClient = useQueryClient();
    const { data } = useEnsureFirebaseDocQuery(userType);

    const isSessionCoach = userType === 'coaches' && session.coach?.id === currentUser?.uid;

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

    async function payForSession(session: FirebaseSession) {
        const { club } = data as FirebaseAthlete;

        const sessionJson = JSON.stringify(session);
        localStorage.setItem('session', sessionJson);

        const item: StripeItem = {
            connectedAccountId: club.stripeId as string,
            quantity: 1,
            price_data: {
                currency: 'usd',
                unit_amount: session.price * 100,
                product_data: {
                    name: club.name,
                    description: session.type
                }
            }
        };

        try {
            await payForStripeSession(item);
        } catch (error) {
            console.error('Pay for Stripe Session Error: ', error);
        }
    }

    async function onClick() {
        if (userType === 'athletes') {
            await payForSession(session);
        }

        if (userType === 'clubs') {
            await deleteSession(session.id);
        }

        if (isSessionCoach) {
            await deleteSession(session.id);
        }
    }

    return {
        onClick,
        isSessionCoach
    };
}
