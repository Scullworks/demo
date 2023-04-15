import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/hooks/store';
import { CollectionName, FirebaseCollection } from '@/models';
import { getDocDataFromFirebase } from '@/services/firebase';

export function useFirebaseDocQueryOptions<T extends FirebaseCollection>(
    collectionName: CollectionName
) {
    const user = useAuthStore(state => state.user);

    const firebaseDocQueryOptions = {
        queryKey: [collectionName],
        queryFn: () => getDocDataFromFirebase<T>(user?.uid, collectionName),
        enabled: user !== null
    };

    return { firebaseDocQueryOptions };
}

export function useFirebaseDocQuery<T extends FirebaseCollection>(collectionName: CollectionName) {
    const { firebaseDocQueryOptions } = useFirebaseDocQueryOptions(collectionName);
    const { data } = useQuery({ ...firebaseDocQueryOptions });

    return {
        data: data as T
    };
}
