import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FirebaseClub } from '@/hooks/firebase/useAddClubData';
import { Boat } from '@/hooks/store';
import { database, storage } from './setup';

interface AddDocResponse {
    readonly success: boolean;
    readonly error: boolean;
}

export async function createClubAccount(
    clubData: FirebaseClub,
    boats: Boat[],
    imageUrl: string | null
): Promise<AddDocResponse> {
    try {
        let imageRef = null;

        // Upload image
        if (imageUrl) {
            const storageRef = ref(storage, clubData?.name as string);
            const base64Response = await fetch(imageUrl);
            const blob = await base64Response.blob();
            await uploadBytes(storageRef, blob);
            imageRef = await getDownloadURL(storageRef);
        }

        // Add data
        const { path } = await addDoc(collection(database, 'clubs'), {
            ...clubData,
            logo: imageRef
        });

        // Create boats subcollection
        boats.forEach(async boat => await addDoc(collection(database, path, 'boats'), boat));

        return {
            success: true,
            error: false
        };
    } catch (error) {
        console.error('Create Club Account Error: ', error.message);

        return {
            success: false,
            error: true
        };
    }
}
