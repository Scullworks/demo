import { doc, updateDoc } from 'firebase/firestore';
import { CollectionName } from '@/models';
import { database } from './setup';

export async function updateFirebaseDoc<T extends object>(
    collectionName: CollectionName,
    documentId: string,
    data: T
) {
    try {
        const docRef = doc(database, collectionName, documentId);
        await updateDoc(docRef, data);
    } catch (error) {
        console.error('Update Firebase Doc Error: ', error.message);
    }
}
