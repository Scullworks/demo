import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useClubDataQueryOptions } from '@/hooks/queries';
import { FirebaseClub } from '@/models';

export function useEnsureClubDataQuery() {
    const [club, setClub] = useState<FirebaseClub | undefined>(undefined);

    const queryClient = useQueryClient();
    const { clubDataQueryOptions } = useClubDataQueryOptions();

    useEffect(() => {
        async function ensureData() {
            const data = await queryClient.ensureQueryData(clubDataQueryOptions);
            setClub(data);
        }

        ensureData();
    }, [clubDataQueryOptions, queryClient]);

    return { club };
}
