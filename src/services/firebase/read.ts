import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {
    CollectionName,
    FirebaseUserDoc,
    GetDocDataResponse,
    Option,
    ResponseData
} from '@/models';
import { database } from './setup';

interface GetClubsResponse {
    readonly clubs: Option[] | null;
    readonly error: boolean;
}

interface GetUserResponse {
    readonly userDoc: FirebaseUserDoc | null;
    readonly error: boolean;
}

export async function getClubsFromFirebase(): Promise<GetClubsResponse> {
    try {
        let clubs: Option[] = [];

        const collectionRef = collection(database, 'clubs');
        const snapshot = await getDocs(collectionRef);
        snapshot.forEach(doc => {
            clubs = [...clubs, { id: doc.id, value: doc.data().name }];
        });

        return {
            clubs,
            error: false
        };
    } catch (error) {
        console.error('Get Clubs Error: ', error.message);

        return {
            clubs: null,
            error: true
        };
    }
}

// Provides the user's type, so that we can redirect to the appropriate dashboard
export async function getUserFromFirebase(uid: string): Promise<GetUserResponse> {
    try {
        const docRef = doc(database, 'users', uid);
        const userSnap = await getDoc(docRef);
        const userDoc = userSnap.data() as FirebaseUserDoc;

        return {
            userDoc,
            error: false
        };
    } catch (error) {
        console.error('Get User Error: ', error.message);

        return {
            userDoc: null,
            error: true
        };
    }
}

export async function getDocDataFromFirebase<T extends ResponseData>(
    uid: string | undefined,
    collectionName: CollectionName
): Promise<GetDocDataResponse<T>> {
    let data = null;
    const collectionRef = collection(database, collectionName);
    const docQuery = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(docQuery);
    querySnapshot.forEach(doc => (data = doc.data()));
    return data as unknown as T;
}
