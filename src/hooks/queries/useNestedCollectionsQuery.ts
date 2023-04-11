import { useQuery } from '@tanstack/react-query';
import { NestedCollectionName } from '@/models';
import { getNestedClubCollections } from '@/services/firebase';
import { useEnsureClubDataQuery } from './useEnsureClubDataQuery';

export function useNestedCollectionsQuery(collectionName: NestedCollectionName) {
    const { club } = useEnsureClubDataQuery();

    const { data: response } = useQuery({
        queryKey: ['club', 'nested', collectionName],
        queryFn: () => getNestedClubCollections(club?.id, collectionName),
        enabled: club !== undefined
    });

    return { data: response?.data };
}
