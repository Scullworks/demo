import { AxiosResponse } from 'axios';
import { StripeClub } from '@/models';
import { axiosInstance } from './utils';

interface RequestBody {
    readonly connectedAccountId: string;
}

interface Response {
    readonly connectedAccountId: string;
    readonly url: string;
}

export async function connectToStripe(club: StripeClub): Promise<Response> {
    const { name, email } = club;

    // Create connected account
    const { data: connectedAccountId } = await axiosInstance.post<
        string,
        AxiosResponse<string>,
        StripeClub
    >('/accounts', { name, email });

    // Link account
    const { data: url } = await axiosInstance.post<string, AxiosResponse<string>, RequestBody>(
        '/accountLinks',
        { connectedAccountId }
    );

    return { connectedAccountId, url };
}
