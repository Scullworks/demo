import { PulseLoader } from 'react-spinners';
import { ClubProfileLayout } from '@/components';
import { useClubPayments } from '@/hooks/pages';

function ClubPayments() {
    const { isLoading, club, onConnectClick } = useClubPayments();

    if (isLoading) {
        return (
            <ClubProfileLayout club={club}>
                <div className="loading__profile">
                    <PulseLoader color="rgb(255, 179, 109)" />
                    <p>Redirecting you to Stripe</p>
                </div>
            </ClubProfileLayout>
        );
    }

    return (
        <ClubProfileLayout club={club}>
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
