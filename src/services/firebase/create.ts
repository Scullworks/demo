import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Boat } from '@/hooks/store';
import { FirebaseDoc, FirebaseClubDoc } from '@/models';
import { database, storage } from './setup';

interface AddDocResponse {
    readonly success: boolean;
    readonly error: boolean;
}

export async function createAccount<T extends FirebaseDoc | FirebaseClubDoc>(
    collectionName: 'clubs' | 'athletes' | 'coaches',
    data: T,
    imageUrl: string | null,
    boats?: Boat[]
): Promise<AddDocResponse> {
    try {
        let imageRef = null;

        // Upload image
        if (imageUrl) {
            const storageRef = ref(storage, data?.name as string);
            const base64Response = await fetch(imageUrl);
            const blob = await base64Response.blob();
            await uploadBytes(storageRef, blob);
            imageRef = await getDownloadURL(storageRef);
        }

        // Add club data
        if (collectionName === 'clubs') {
            const { path } = await addDoc(collection(database, 'clubs'), {
                ...data,
                profileImage: imageRef
            });

            // Add to club's boats subcollection
            boats?.forEach(async boat => await addDoc(collection(database, path, 'boats'), boat));
        }

        // Add to athletes' and coaches' subcollections for the appropriate club
        if ('club' in data) {
            await addDoc(collection(database, 'clubs', data.club.id, collectionName), data);
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
