import { useQuery } from 'react-query';
import { NestedCollectionName } from '@/models';
import { getNestedClubOptions } from '@/services/firebase';

export function useNestedOptionsQuery(
    clubId: string | undefined,
    collectionName: NestedCollectionName,
    shouldFetch: boolean
) {
    const { data } = useQuery({
        queryKey: `club-${collectionName}`,
        queryFn: () => getNestedClubOptions(clubId, collectionName),
        enabled: shouldFetch
    });

    return { options: data?.options };
}
