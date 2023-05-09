import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useFirebaseDocStore } from '@/hooks/store';
import { NestedCollectionName } from '@/models';
import { getNestedClubCollections } from '@/services/firebase';

export function useNestedCollectionsQuery<T>(collectionName: NestedCollectionName) {
    const club = useFirebaseDocStore(state => state.data);
    const [enabled, setEnabled] = useState(false);

    if (club && !enabled) setEnabled(true);

    const { data: response } = useQuery({
        queryKey: ['club', 'nested', collectionName],
        queryFn: () => getNestedClubCollections<T>(club?.id, collectionName),
        enabled
    });

    return { data: response?.data };
}
