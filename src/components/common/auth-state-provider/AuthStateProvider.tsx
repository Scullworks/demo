import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { auth, getUserFromFirebase } from '@/services/firebase';

interface AuthStateProviderProps {
    readonly isAuthRoute?: boolean;
}

function AuthStateProvider(props: PropsWithChildren<AuthStateProviderProps>) {
    const { isAuthRoute, children } = props;

    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useAuthStore(state => state.user);
    const setCurrentUser = useAuthStore(state => state.setUser);

    const router = useRouter();
    const { userType } = useLocalStorage();

    const completedOnboarding = typeof window !== 'undefined' && localStorage.getItem('completed');

    // Completed onboarding status  and user type in local storage
    if (currentUser && userType && completedOnboarding) {
        const isInProfileRoute = router.asPath.includes(`/profile/${userType}`);
        if (!isInProfileRoute) router.push(`/profile/${userType}`);
    }

    useEffect(() => {
        async function getUserOnboardingStatus() {
            const noOnboardingStatus = !userType || !completedOnboarding;

            if (currentUser && noOnboardingStatus) {
                const { userDoc } = await getUserFromFirebase(currentUser.uid);

                if (userDoc) {
                    const { completedOnboarding, type } = userDoc;

                    const isProfileRoute = router.asPath.includes(`/profile/${type}`);
                    const isOnboardingRoute = router.asPath.includes(`/onboarding/${userDoc.type}`);

                    localStorage.setItem('user', type);

                    if (completedOnboarding && !isProfileRoute) {
                        localStorage.setItem('completed', `${completedOnboarding}`);
                        await router.push(`/profile/${type}`);
                    }

                    if (!completedOnboarding && !isOnboardingRoute) {
                        await router.push(`/onboarding/${userDoc.type}/profile`);
                    }
                }
            }
        }

        getUserOnboardingStatus();
    }, [completedOnboarding, currentUser, router, userType]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setIsLoading(true);

            if (user) {
                setCurrentUser(user);
                setIsLoading(false);
            }

            if (!user) {
                setCurrentUser(null);
                if (!isAuthRoute) router.push('/login');
                setIsLoading(false);
            }
        });
    }, [setCurrentUser, isAuthRoute, router]);

    if (isLoading) {
        return (
            <div className="loading">
                <PropagateLoader color="rgb(255, 179, 109)" />
            </div>
        );
    }

    return <div>{children}</div>;
}

export default AuthStateProvider;
