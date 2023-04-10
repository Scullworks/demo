import { useQuery } from '@tanstack/react-query';
import { useDateStore } from '@/hooks/store';
import { getSessionsFromFirebase } from '@/services/firebase';

export function useSessionsQuery(clubId: string | undefined, shouldFetch: boolean) {
    const activeStartDate = useDateStore(state => state.activeStartDate);
    const activeEndDate = useDateStore(state => state.activeEndDate);

    const { data, refetch } = useQuery({
        queryKey: ['club', 'sessions'],
        queryFn: () => getSessionsFromFirebase(clubId, activeStartDate, activeEndDate),
        enabled: shouldFetch
    });

    return { sessions: data?.sessions, refetch };
}
