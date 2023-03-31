import { collection, getDocs } from 'firebase/firestore';
import { Option } from '@/models';
import { database } from './setup';

interface GetClubsResponse {
    readonly clubs: Option[] | null;
    readonly error: boolean;
}

export async function getClubsFromFirebase(): Promise<GetClubsResponse> {
    try {
        let clubs: Option[] = [];

        const snapshot = await getDocs(collection(database, 'clubs'));
        snapshot.forEach(doc => {
            clubs = [...clubs, { id: doc.id, value: doc.data().name }];
        });

        return {
            clubs,
            error: false
        };
    } catch (error) {
        console.error('Get Clubs Error: ', error);

        return {
            clubs: null,
            error: true
        };
    }
}
