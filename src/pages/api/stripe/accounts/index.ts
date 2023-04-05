import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { StripeClub } from '@/models';
import { stripe } from '@/services/stripe/utils';

interface CreateAccountRequest extends NextApiRequest {
    ['body']: StripeClub;
}

async function handler(
    req: CreateAccountRequest,
    res: NextApiResponse<Stripe.Response<Stripe.Account> | string>
) {
    if (req.method === 'POST') {
        const { name } = req.body;

        const { id } = await stripe.accounts.create({
            type: 'express',
            country: 'US',
            default_currency: 'usd',
            business_type: 'company',
            business_profile: {
                name: name
            },
            company: {
                name
            }
        });

        return res.status(201).json(id);
    }
}

export default handler;
