import { useQuery } from '@tanstack/react-query';
import { getClubsFromFirebase } from '@/services/firebase';

export function useGetClubsQuery() {
    const { data } = useQuery(['registered', 'clubs'], getClubsFromFirebase);
    return { clubs: data?.clubs };
}
