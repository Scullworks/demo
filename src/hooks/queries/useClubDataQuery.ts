import { useQuery } from 'react-query';
import { useAuthStore } from '@/hooks/store';
import { FirebaseClub } from '@/models';
import { getDocDataFromFirebase } from '@/services/firebase';

export function useClubDataQuery() {
    const user = useAuthStore(state => state.user);

    const { data: club } = useQuery({
        queryKey: 'club-data',
        queryFn: () => getDocDataFromFirebase<FirebaseClub>(user?.uid, 'clubs'),
        enabled: user !== null
    });

    return { club };
}
