import { PaymentIntent } from '@stripe/stripe-js';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const { id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(id as string, {
        expand: ['payment_intent', 'line_items.data.price.product']
    });

    const paymentIntent = session.payment_intent as PaymentIntent;

    return res.status(200).json(paymentIntent.id);
}

export default handler;
