import {
    Timestamp,
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore';
import {
    CollectionName,
    FirebaseUserDoc,
    GetDocDataResponse,
    NestedCollectionName,
    FirebaseCollection,
    FirebaseSession,
    OptionWithProfileImage,
    OptionWIthStripe
} from '@/models';
import { database } from './setup';

export async function getClubsFromFirebase() {
    try {
        let clubs: OptionWIthStripe[] = [];

        const collectionRef = collection(database, 'clubs');
        const snapshot = await getDocs(collectionRef);
        snapshot.forEach(doc => {
            clubs = [
                ...clubs,
                { id: doc?.id, value: doc.data().name, stripeId: doc.data()?.stripe?.id }
            ];
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

export async function getNestedClubOptions(
    clubId: string | undefined,
    collectionName: NestedCollectionName
) {
    try {
        let options: OptionWithProfileImage[] = [];

        if (clubId) {
            const collectionRef = collection(database, 'clubs', clubId, collectionName);
            const snapshot = await getDocs(collectionRef);
            snapshot.forEach(doc => {
                options = [
                    ...options,
                    {
                        id: doc.id,
                        value: doc.data().name,
                        profileImageRef: doc.data().profileImageRef ?? null
                    }
                ];
            });
        }

        return {
            options,
            error: false
        };
    } catch (error) {
        console.error('Get Clubs Error: ', error.message);

        return {
            options: null,
            error: true
        };
    }
}

export async function getNestedClubCollections<T extends FirebaseCollection>(
    clubId: string | undefined,
    collectionName: NestedCollectionName
) {
    try {
        let data: T[] = [];

        if (clubId) {
            const collectionRef = collection(database, 'clubs', clubId, collectionName);
            const snapshot = await getDocs(collectionRef);
            snapshot.forEach(doc => {
                data = [
                    ...data,
                    {
                        ...(doc.data() as T),
                        id: doc.id
                    }
                ];
            });
        }

        return {
            data,
            error: false
        };
    } catch (error) {
        console.error('Get Nested Collection Error: ', error.message);

        return {
            data: null,
            error: true
        };
    }
}

export async function getSessionsFromFirebase(
    clubId: string | undefined,
    startDate: Date,
    endDate: Date
) {
    try {
        let sessions: FirebaseSession[] = [];

        if (clubId) {
            const sessionsRef = collection(database, 'clubs', clubId, 'sessions');
            const sessionsQuery = query(
                sessionsRef,
                where('date', '>=', Timestamp.fromDate(startDate)),
                where('date', '<=', Timestamp.fromDate(endDate))
            );

            const snapshot = await getDocs(sessionsQuery);
            snapshot.forEach(doc => {
                sessions = [...sessions, { id: doc.id, ...doc.data() }] as FirebaseSession[];
            });
        }

        return {
            sessions,
            error: false
        };
    } catch (error) {
        console.error('Get Sessions Error: ', error.message);

        return {
            sessions: null,
            error: true
        };
    }
}

// Provides the user's type, so that we can redirect to the appropriate dashboard
export async function getUserFromFirebase(uid: string) {
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

export async function getDocDataFromFirebase<T extends FirebaseCollection>(
    uid: string | undefined,
    collectionName: CollectionName
): Promise<GetDocDataResponse<T> | undefined> {
    if (!uid) return;

    let data = null;
    const collectionRef = collectionGroup(database, collectionName);
    const docQuery = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(docQuery);
    querySnapshot.forEach(doc => (data = { ...doc.data(), id: doc.id }));
    return data as unknown as T;
}
