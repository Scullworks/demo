import { useQuery } from '@tanstack/react-query';
import { FirebaseCollection, NestedCollectionName } from '@/models';
import { getNestedClubCollections } from '@/services/firebase';
import { useEnsureClubDataQuery } from './useEnsureClubDataQuery';

export function useNestedCollectionsQuery<T extends FirebaseCollection>(
    collectionName: NestedCollectionName
) {
    const { club } = useEnsureClubDataQuery();

    const { data: response } = useQuery({
        queryKey: ['club', 'nested', collectionName],
        queryFn: () => getNestedClubCollections<T>(club?.id, collectionName),
        enabled: club !== undefined
    });

    return { data: response?.data };
}
