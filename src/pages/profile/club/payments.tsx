import { PropagateLoader } from 'react-spinners';
import { PageTitle, ProfileLayout } from '@/components';
import { useClubPayments } from '@/hooks/pages';
import { useFirebaseDocStore } from '@/hooks/store';
import { FirebaseClub } from '@/models';

function ClubPayments() {
    const { isLoading, isRedirecting, onConnectClick } = useClubPayments();

    const data = useFirebaseDocStore(state => state.data);
    const club = data as FirebaseClub | null;

    if (isLoading || isRedirecting) {
        return (
            <>
                <PageTitle text="Payments" />
                <ProfileLayout for="clubs">
                    <div className="loading__profile">
                        <PropagateLoader color="rgb(255, 179, 109)" />
                        {isRedirecting && <p>Redirecting you to Stripe</p>}
                    </div>
                </ProfileLayout>
            </>
        );
    }

    return (
        <>
            <PageTitle text="Payments" />
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
        </>
    );
}

export default ClubPayments;

function onRedirectClick() {
    window.location.href = 'https://connect.stripe.com/app/express';
}
