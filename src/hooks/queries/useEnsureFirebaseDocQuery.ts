import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFirebaseDocQueryOptions } from '@/hooks/queries';
import { CollectionName, FirebaseCollection } from '@/models';

export function useEnsureFirebaseDocQuery<T extends FirebaseCollection>(
    collectionName: CollectionName
) {
    const [data, setData] = useState<T | undefined>(undefined);

    const queryClient = useQueryClient();
    const { firebaseDocQueryOptions } = useFirebaseDocQueryOptions<T>(collectionName);

    useEffect(() => {
        async function ensureData() {
            const data = await queryClient.ensureQueryData(firebaseDocQueryOptions);
            setData(data);
        }

        ensureData();
    }, [firebaseDocQueryOptions, queryClient]);

    return { data };
}
