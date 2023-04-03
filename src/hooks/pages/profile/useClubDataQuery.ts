import { useQuery } from 'react-query';
import { useAuthStore } from '@/hooks/store';
import { FirebaseClubWithImage, GetDocDataResponse } from '@/models';
import { getDocDataFromFirebase } from '@/services/firebase';

export function useClubDataQuery() {
    const user = useAuthStore(state => state.user);

    const { data: club } = useQuery<GetDocDataResponse<FirebaseClubWithImage>, Error>({
        queryKey: 'club-info',
        queryFn: () => getDocDataFromFirebase(user?.uid, 'clubs'),
        enabled: user !== null
    });

    return { club };
}
