import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { useStoredUserType } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { auth, getUserFromFirebase } from '@/services/firebase';

interface AuthStateProviderProps {
    readonly isAuthRoute?: boolean;
}

function AuthStateProvider(props: PropsWithChildren<AuthStateProviderProps>) {
    const { isAuthRoute, children } = props;

    const [isLoading, setIsLoading] = useState(false);

    const setCurrentUser = useAuthStore(state => state.setUser);

    const router = useRouter();

    const { storedUserType } = useStoredUserType();

    const isWindow = typeof window !== 'undefined';
    const completedOnboarding = isWindow && localStorage.getItem('completed') ? true : false;

    useEffect(() => {
        onAuthStateChanged(auth, async user => {
            setIsLoading(true);

            // Completed onboarding status  and user type in local storage
            if (user && storedUserType && completedOnboarding) {
                setCurrentUser(user);
                const isInProfileRoute = router.asPath.includes(`/profile/${storedUserType}`);
                if (!isInProfileRoute) router.push(`/profile/${storedUserType}`);
                setIsLoading(false);
                return;
            }

            // Missing onboarding status and/or  missing user type in local storage
            if (user && (!storedUserType || !completedOnboarding)) {
                setCurrentUser(user);

                const { userDoc } = await getUserFromFirebase(user.uid);

                if (userDoc) {
                    const { completedOnboarding, type } = userDoc;

                    const isProfileRoute = router.asPath.includes(`/profile/${type}`);
                    const isOnboardingRoute = router.asPath.includes(`/onboarding/${userDoc.type}`);

                    localStorage.setItem('user', type);

                    if (completedOnboarding && !isProfileRoute) {
                        localStorage.setItem('completed', `${completedOnboarding}`);
                        router.push(`/profile/${type}`);
                    }

                    if (!completedOnboarding && !isOnboardingRoute) {
                        router.push(`/onboarding/${userDoc.type}/profile`);
                    }

                    setIsLoading(false);
                    return;
                }
            } else {
                setCurrentUser(null);
                if (!isAuthRoute) router.push('/login');
                setIsLoading(false);
            }
        });
    }, [setCurrentUser, router, isAuthRoute, storedUserType, completedOnboarding]);

    if (isLoading) {
        return (
            <div className="loading">
                <PropagateLoader color="rgb(255, 179, 109)" />
            </div>
        );
    }

    return <>{children}</>;
}

export default AuthStateProvider;
