import { useQuery } from 'react-query';
import { getSessionsFromFirebase } from '@/services/firebase';

export function useSessionsQuery(clubId: string | undefined, shouldFetch: boolean) {
    const { data, isFetching, isRefetching } = useQuery({
        queryKey: 'club-sessions',
        queryFn: () => getSessionsFromFirebase(clubId),
        enabled: shouldFetch
    });

    return { sessions: data?.sessions, isFetching, isRefetching };
}
