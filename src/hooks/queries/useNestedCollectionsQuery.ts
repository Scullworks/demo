import { useQuery } from '@tanstack/react-query';
import { FirebaseClub, FirebaseCollection, NestedCollectionName } from '@/models';
import { getNestedClubCollections } from '@/services/firebase';
import { useEnsureFirebaseDocQuery } from './useEnsureFirebaseDocQuery';

export function useNestedCollectionsQuery<T extends FirebaseCollection>(
    collectionName: NestedCollectionName
) {
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');

    const { data: response } = useQuery({
        queryKey: ['club', 'nested', collectionName],
        queryFn: () => getNestedClubCollections<T>(club?.id, collectionName),
        enabled: club !== undefined
    });

    return { data: response?.data };
}
