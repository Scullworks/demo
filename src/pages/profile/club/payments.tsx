import { PropagateLoader } from 'react-spinners';
import { ClubProfileLayout } from '@/components';
import { useClubPayments } from '@/hooks/pages';
import { useEnsureClubDataQuery } from '@/hooks/queries/useEnsureClubDataQuery';

function ClubPayments() {
    const { isLoading, isRedirecting, onConnectClick } = useClubPayments();
    const { club } = useEnsureClubDataQuery();

    if (isLoading || isRedirecting) {
        return (
            <ClubProfileLayout>
                <div className="loading__profile">
                    <PropagateLoader color="rgb(255, 179, 109)" />
                    {isRedirecting && <p>Redirecting you to Stripe</p>}
                </div>
            </ClubProfileLayout>
        );
    }

    return (
        <ClubProfileLayout>
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
        </ClubProfileLayout>
    );
}

export default ClubPayments;

function onRedirectClick() {
    window.location.href = 'https://connect.stripe.com/app/express';
}
