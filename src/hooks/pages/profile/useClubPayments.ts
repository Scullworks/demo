import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { FirebaseClub } from '@/models';
import { updateFirebaseDoc } from '@/services/firebase';
import { connectToStripe } from '@/services/stripe';
import { axiosInstance } from '@/services/stripe/utils';

export function useClubPayments() {
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const queryClient = useQueryClient();
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');

    async function onConnectClick() {
        if (!club?.name || !club?.email) return;

        setIsRedirecting(true);

        const { name, email } = club;
        // Get connected account id and redirect url
        const { connectedAccountId, url: connectOnboardingUrl } = await connectToStripe({
            name,
            email
        });

        // Add connected account id to database
        await updateFirebaseDoc('clubs', club.id, { 'stripe.id': connectedAccountId });
        // Redirect to Stripe Connect
        window.location.href = connectOnboardingUrl;
    }

    useEffect(() => {
        let isMounted = true;

        // REVIEW: Switch to react-query implementation
        async function checkAccountStatus() {
            if (club?.stripe.connected) return;

            setIsLoading(true);

            const accountIsConnected = club?.id && club.stripe.id && club.stripe.connected;

            if (!accountIsConnected) {
                setIsLoading(false);
                return;
            }

            if (!isMounted) return;

            const {
                data: { detailsSubmitted }
            } = await axiosInstance.get(`accounts/${club?.stripe.id}`);

            if (detailsSubmitted) {
                await updateFirebaseDoc('clubs', club.id, { 'stripe.connected': true });
                await queryClient.refetchQueries({ queryKey: ['club'] });
            }

            setIsLoading(false);
        }

        checkAccountStatus();

        return () => {
            isMounted = false;
        };
    }, [club?.id, club?.stripe.id, club?.stripe.connected, queryClient]);

    return {
        isLoading,
        isRedirecting,
        onConnectClick
    };
}
