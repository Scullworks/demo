import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/services/stripe/utils';

interface CreateAccountLinkRequest extends NextApiRequest {
    ['body']: {
        readonly connectedAccountId: string;
    };
}

const PAYMENTS_ENDPOINT = '/profile/club/payments';

async function handler(req: CreateAccountLinkRequest, res: NextApiResponse<string>) {
    if (req.method === 'POST') {
        const { connectedAccountId } = req.body;

        const { url } = await stripe.accountLinks.create({
            account: connectedAccountId,
            refresh_url: req.headers.origin + PAYMENTS_ENDPOINT,
            return_url: req.headers.origin + PAYMENTS_ENDPOINT,
            type: 'account_onboarding'
        });

        return res.status(201).json(url);
    }
}

export default handler;
