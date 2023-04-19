import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { CollectionName, SessionAttendee } from '@/models';
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

export async function addSessionAttendee(
    clubId: string,
    sessionId: string,
    attendee: SessionAttendee
) {
    try {
        const docRef = doc(database, 'clubs', clubId, 'sessions', sessionId);
        await updateDoc(docRef, {
            attendees: arrayUnion(attendee)
        });
    } catch (error) {
        console.error('Add Session Attendee Error: ', error.message);
    }
}
