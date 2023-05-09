import Image from 'next/image';
import Link from 'next/link';
import checkoutSuccess from '@/assets/profile/checkout-success.svg';
import { AuthStateProvider, PageTitle } from '@/components';
import { useCheckoutSuccess } from '@/hooks/pages';

function CheckoutSuccess() {
    const { onBackToDashboardClick } = useCheckoutSuccess();

    return (
        <>
            <PageTitle text="Checkout" />
            <AuthStateProvider isProfileRoute>
                <div className="profile-checkout">
                    <Image src={checkoutSuccess} alt="Successful payment" priority />
                    <h1>Payment was successful</h1>
                    <p>
                        You can always view the details in the{' '}
                        <Link href="/profile/athlete/payments">payments</Link> section
                    </p>
                    <button className="button__static" onClick={onBackToDashboardClick}>
                        Back to Dashboard
                    </button>
                </div>
            </AuthStateProvider>
        </>
    );
}

export default CheckoutSuccess;
