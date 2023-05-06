import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Loader } from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { auth, getUserFromFirebase } from '@/services/firebase';

interface AuthRouteProps {
    readonly isAuthRoute: boolean;
    readonly isOnboardingRoute?: never;
    readonly isProfileRoute?: never;
}

interface OnboardingRouteProps {
    readonly isAuthRoute?: never;
    readonly isOnboardingRoute: boolean;
    readonly isProfileRoute?: never;
}

interface ProfileRouteProps {
    readonly isAuthRoute?: never;
    readonly isOnboardingRoute?: never;
    readonly isProfileRoute: boolean;
}

type AuthStateProviderProps = AuthRouteProps | OnboardingRouteProps | ProfileRouteProps;

function AuthStateProvider(props: PropsWithChildren<AuthStateProviderProps>) {
    const { isAuthRoute, isOnboardingRoute, isProfileRoute, children } = props;

    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useAuthStore(state => state.user);
    const setCurrentUser = useAuthStore(state => state.setUser);

    const {
        userType,
        userHasCompletedOnboarding,
        setStorageUserType,
        setStorageStartedOnboarding,
        setStorageCompletedOnboarding,
        setStorageLoggedIn,
        clearStorage
    } = useLocalStorage();

    const router = useRouter();

    if (currentUser && userType && userHasCompletedOnboarding && !isProfileRoute) {
        router.push(`/profile/${userType}`);
    }

    if (currentUser && userType && !userHasCompletedOnboarding && !isOnboardingRoute) {
        router.push(`/onboarding/${userType}/profile`);
    }

    useEffect(() => {
        let mounted = true;

        async function getUserOnboardingStatus() {
            if (mounted && currentUser && (!userType || !userHasCompletedOnboarding)) {
                const { userDoc } = await getUserFromFirebase(currentUser.uid);
                if (!userDoc) return;

                const { startedOnboarding, completedOnboarding, type } = userDoc;
                setStorageUserType(type);

                if (completedOnboarding) {
                    setStorageCompletedOnboarding();
                    if (!isProfileRoute) await router.push(`/profile/${type}`);
                    return;
                }

                if (startedOnboarding && !completedOnboarding) {
                    setStorageStartedOnboarding();
                    if (!isOnboardingRoute) await router.push(`/onboarding/${type}/profile`);
                }
            }
        }
        getUserOnboardingStatus();

        return () => {
            mounted = false;
        };
    }, [
        userHasCompletedOnboarding,
        currentUser,
        isOnboardingRoute,
        isProfileRoute,
        router,
        setIsLoading,
        userType,
        setStorageUserType,
        setStorageStartedOnboarding,
        setStorageCompletedOnboarding
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user);
                setStorageLoggedIn();
            }

            if (!user) {
                clearStorage();
                setCurrentUser(null);
                if (!isAuthRoute) router.push('/login');
            }
        });
    }, [setCurrentUser, setStorageLoggedIn, isAuthRoute, router, clearStorage]);

    if (isLoading) {
        return <Loader />;
    }

    return <div>{children}</div>;
}

export default AuthStateProvider;
