import { PropagateLoader } from 'react-spinners';
import { ProfileLayout } from '@/components';
import { useClubPayments } from '@/hooks/pages';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { FirebaseClub } from '@/models';

function ClubPayments() {
    const { isLoading, isRedirecting, onConnectClick } = useClubPayments();
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');

    if (isLoading || isRedirecting) {
        return (
            <ProfileLayout for="clubs">
                <div className="loading__profile">
                    <PropagateLoader color="rgb(255, 179, 109)" />
                    {isRedirecting && <p>Redirecting you to Stripe</p>}
                </div>
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout for="clubs">
            <div className="profile-payments">
                {club?.stripe.connected ? (
                    <>
                        <button className="button__static" onClick={onRedirectClick}>
                            Stripe Dashboard
                        </button>
                        <p>View your balance and track your earnings in real time</p>
                    </>
                ) : (
                    <>
                        <button className="button__static" onClick={onConnectClick}>
                            Connect to Stripe
                        </button>
                        <p>Create your Stripe merchant account and get paid</p>
                    </>
                )}
            </div>
        </ProfileLayout>
    );
}

export default ClubPayments;

function onRedirectClick() {
    window.location.href = 'https://connect.stripe.com/app/express';
}
