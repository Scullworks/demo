import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';
import { PageTitle } from '@/components';
import { useLocalStorage } from '@/hooks/common';
import {
    useAthleteOnboardingStore,
    useClubOnboardingStore,
    useCommonOnboardingStore
} from '@/hooks/store';
import { signOutUser } from '@/services/firebase';

function SignOut() {
    const resetCommonStore = useCommonOnboardingStore(state => state.reset);
    const resetClubStore = useClubOnboardingStore(state => state.reset);
    const resetAthleteStore = useAthleteOnboardingStore(state => state.reset);

    const { clearStorage } = useLocalStorage();

    const router = useRouter();

    useEffect(() => {
        async function signOut() {
            clearStorage();
            resetCommonStore();
            resetClubStore();
            resetAthleteStore();
            await signOutUser();
            router.replace('/login');
        }

        signOut();
    }, [clearStorage, resetCommonStore, resetClubStore, resetAthleteStore, router]);

    return (
        <div className="loading">
            <PageTitle text="Sign Out" />
            <PropagateLoader color="rgb(255, 179, 109)" />
        </div>
    );
}

export default SignOut;
