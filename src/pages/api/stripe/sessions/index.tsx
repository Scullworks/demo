import { StripeItem } from '@/services/stripe';
import { stripe } from '@/services/stripe/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

interface PayForSessionRequest extends NextApiRequest {
    ['body']: StripeItem;
}

async function handler(req: PayForSessionRequest, res: NextApiResponse<string>) {
    if (req.method === 'POST') {
        const { connectedAccountId, price_data, quantity } = req.body;
        const price = price_data.unit_amount / 100;
        const stripeFee = price * 0.029 + 0.3;
        const platFormFee = price * 0.05;
        const fees = stripeFee + platFormFee;

        const session = await stripe.checkout.sessions.create({
            line_items: [{ price_data, quantity }],
            success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/profile/athlete`,
            mode: 'payment',
            payment_intent_data: {
                application_fee_amount: Math.round(fees * 100),
                transfer_data: {
                    destination: connectedAccountId
                }
            }
        });

        return res.status(201).json(session.id);
    }
}

export default handler;
