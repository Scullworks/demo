import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { FirebaseDoc, FirebaseClubDoc, Boat, CollectionName, ProfileSession } from '@/models';
import { database, storage } from './setup';

interface AddDocResponse {
    readonly success: boolean;
    readonly error: boolean;
}

export async function createSession(clubId: string, data: ProfileSession): Promise<AddDocResponse> {
    try {
        await addDoc(collection(database, 'clubs', clubId, 'sessions'), data);

        return {
            success: true,
            error: false
        };
    } catch (error) {
        console.error('Create Session Error: ', error.message);

        return {
            success: false,
            error: true
        };
    }
}

export async function createAccount<T extends FirebaseDoc | FirebaseClubDoc>(
    collectionName: CollectionName,
    data: T,
    imageUrl: string | null,
    boats?: Boat[]
): Promise<AddDocResponse> {
    try {
        let profileImageRef = null;
        let profileImage = null;

        // Upload image
        if (imageUrl) {
            profileImage = uuid();
            const storageRef = ref(storage, profileImage);
            const base64Response = await fetch(imageUrl);
            const blob = await base64Response.blob();
            await uploadBytes(storageRef, blob);
            profileImageRef = await getDownloadURL(storageRef);
        }

        // Add club data
        if (collectionName === 'clubs') {
            const { path } = await addDoc(collection(database, 'clubs'), {
                ...data,
                profileImage,
                profileImageRef
            });

            // Add to club's boats subcollection
            boats?.forEach(async boat => await addDoc(collection(database, path, 'boats'), boat));
        }

        // Add to athletes' and coaches' subcollections for the appropriate club
        if ('club' in data) {
            await addDoc(collection(database, 'clubs', data.club.id, collectionName), {
                ...data,
                profileImage,
                profileImageRef
            });
        }

        return {
            success: true,
            error: false
        };
    } catch (error) {
        console.error('Create Account Error: ', error.message);

        return {
            success: false,
            error: true
        };
    }
}
