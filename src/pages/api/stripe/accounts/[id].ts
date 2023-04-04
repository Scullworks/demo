import { NextApiRequest, NextApiResponse } from 'next';
import { StripeClub } from '@/models';
import { stripe } from '@/utils/stripe';

interface RetrieveAccountRequest extends NextApiRequest {
    ['body']: StripeClub;
}

interface Response {
    readonly detailsSubmitted: boolean;
}

async function handler(req: RetrieveAccountRequest, res: NextApiResponse<Response>) {
    if (req.method === 'GET') {
        const { id } = req.query;

        if (!id)
            return res.status(200).json({
                detailsSubmitted: false
            });

        const account = await stripe.accounts.retrieve(id as string);

        return res.status(200).json({
            detailsSubmitted: account.details_submitted
        });
    }
}

export default handler;
