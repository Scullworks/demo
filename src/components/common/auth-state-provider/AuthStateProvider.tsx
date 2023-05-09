import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';
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

    const currentUser = useAuthStore(state => state.user);
    const setCurrentUser = useAuthStore(state => state.setUser);

    const {
        userType,
        userHasStartedOnboarding,
        userHasCompletedOnboarding,
        userIsLoggedIn,
        setStorageUserType,
        setStorageStartedOnboarding,
        setStorageCompletedOnboarding,
        setStorageLoggedIn
    } = useLocalStorage();

    const router = useRouter();

    if (currentUser && userType && userHasCompletedOnboarding && !isProfileRoute) {
        router.push(`/profile/${userType}`);
    }

    if (currentUser && userType && !userHasCompletedOnboarding && !isOnboardingRoute) {
        router.push(`/onboarding/${userType}/profile`);
    }

    const noOnboardingStatus =
        userIsLoggedIn &&
        currentUser &&
        (!userType || !userHasStartedOnboarding || !userHasCompletedOnboarding);

    useEffect(() => {
        let mounted = true;

        async function getUserOnboardingStatus() {
            if (mounted && noOnboardingStatus) {
                const { userDoc } = await getUserFromFirebase(currentUser.uid);

                if (!userDoc) return;

                const { startedOnboarding, completedOnboarding, type } = userDoc;
                setStorageUserType(type);

                if (completedOnboarding) {
                    setStorageCompletedOnboarding();
                    !isProfileRoute && router.push(`/profile/${type}`);
                }

                if (startedOnboarding && !completedOnboarding) {
                    setStorageStartedOnboarding();
                    !isOnboardingRoute && router.push(`/onboarding/${type}/profile`);
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
        userType,
        setStorageUserType,
        setStorageStartedOnboarding,
        setStorageCompletedOnboarding,
        userIsLoggedIn,
        noOnboardingStatus
    ]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user);
                setStorageLoggedIn();
            }

            if (!user) {
                setCurrentUser(null);
                !isAuthRoute && router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [currentUser, isAuthRoute, router, setCurrentUser, setStorageLoggedIn]);

    return <div>{children}</div>;
}

export default AuthStateProvider;
