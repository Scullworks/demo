import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore, useFirebaseDocStore } from '@/hooks/store';
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
    const { data } = useQuery(firebaseDocQueryOptions);

    const currentUsersData = useFirebaseDocStore(state => state.data);
    const setCurrentUsersData = useFirebaseDocStore(state => state.setData);

    const previousData = JSON.stringify(currentUsersData);
    const currentData = JSON.stringify(data);

    useEffect(() => {
        if (previousData !== currentData) setCurrentUsersData(data as T);
    }, [currentData, data, previousData, setCurrentUsersData]);
}
