import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/hooks/store';
import { CollectionName, FirebaseCollection } from '@/models';
import { getDocDataFromFirebase } from '@/services/firebase';

export function useFirebaseDocQueryOptions<T extends FirebaseCollection>(
    collectionName: CollectionName
) {
    const user = useAuthStore(state => state.user);

    const clubDataQueryOptions = {
        queryKey: [collectionName],
        queryFn: () => getDocDataFromFirebase<T>(user?.uid, collectionName),
        enabled: user !== null
    };

    return { clubDataQueryOptions };
}

export function useFirebaseDocQuery(collectionName: CollectionName) {
    const { clubDataQueryOptions } = useFirebaseDocQueryOptions(collectionName);
    const { data: club } = useQuery({ ...clubDataQueryOptions });

    return { club };
}
