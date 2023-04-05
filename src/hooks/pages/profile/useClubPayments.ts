import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useClubDataQuery } from '@/hooks/pages';
import { updateFirebaseDoc } from '@/services/firebase';
import { connectToStripe } from '@/services/stripe';
import { axiosInstance } from '@/services/stripe/utils';

export function useClubPayments() {
    const [isLoading, setIsLoading] = useState(false);

    const { club } = useClubDataQuery();
    const queryClient = useQueryClient();

    async function onConnectClick() {
        if (!club?.name || !club?.email) return;

        setIsLoading(true);

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
        async function checkAccountStatus() {
            setIsLoading(true);

            const accountIsConnected = club?.id && club.stripe.id && club.stripe.connected;

            if (!accountIsConnected) {
                setIsLoading(false);
                return;
            }

            const {
                data: { detailsSubmitted }
            } = await axiosInstance.get(`accounts/${club?.stripe.id}`);

            if (detailsSubmitted) {
                await updateFirebaseDoc('clubs', club.id, { 'stripe.connected': true });
                queryClient.invalidateQueries('club-info');
            }

            setIsLoading(false);
        }

        checkAccountStatus();
    }, [club?.id, club?.stripe.id, club?.stripe.connected, queryClient]);

    return {
        isLoading,
        club,
        onConnectClick
    };
}
