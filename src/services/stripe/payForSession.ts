import { AxiosResponse } from 'axios';
import { axiosInstance, stripePromise } from './utils';

type Currency = 'usd' | 'cad' | 'gbp' | 'eur';

interface ProductData {
    readonly name: string;
    readonly description?: string;
}

interface PriceData {
    readonly currency: Currency;
    readonly unit_amount: number;
    readonly product_data: ProductData;
}

export interface StripeItem {
    readonly quantity: number;
    readonly price_data: PriceData;
    readonly connectedAccountId: string;
}

export async function payForStripeSession(item: StripeItem) {
    const { data: sessionId } = await axiosInstance.post<string, AxiosResponse<string>, StripeItem>(
        '/sessions',
        item
    );

    try {
        const stripe = await stripePromise;
        if (stripe) await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
        console.error('Redirect to Checkout Error: ', error.message);
    }
}
