import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/hooks/store';
import { FirebaseClub } from '@/models';
import { getDocDataFromFirebase } from '@/services/firebase';

export function useClubDataQueryOptions() {
    const user = useAuthStore(state => state.user);

    const clubDataQueryOptions = {
        queryKey: ['club'],
        queryFn: () => getDocDataFromFirebase<FirebaseClub>(user?.uid, 'clubs'),
        enabled: user !== null
    };

    return { clubDataQueryOptions };
}

export function useClubDataQuery() {
    const { clubDataQueryOptions } = useClubDataQueryOptions();
    const { data: club } = useQuery({ ...clubDataQueryOptions });

    return { club };
}
