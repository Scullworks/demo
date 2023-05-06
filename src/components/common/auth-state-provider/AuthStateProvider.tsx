import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Loader } from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { auth, getUserFromFirebase, signOutUser } from '@/services/firebase';

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

    useEffect(() => {
        let mounted = true;

        async function getUserOnboardingStatus() {
            if (
                mounted &&
                userIsLoggedIn &&
                currentUser &&
                (!userType || !userHasCompletedOnboarding)
            ) {
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
        setStorageCompletedOnboarding,
        userIsLoggedIn
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(user);
                setStorageLoggedIn();
            }

            if (!user) {
                setCurrentUser(null);
                if (!isAuthRoute) router.push('/login');
            }
        });
    }, [setCurrentUser, setStorageLoggedIn, isAuthRoute, router]);

    useEffect(() => {
        async function tempSignOut() {
            const userSignOutRequest = typeof window !== 'undefined' && localStorage.getItem('out');
            if (userIsLoggedIn && userSignOutRequest) {
                await signOutUser();
            }
        }

        tempSignOut();
    }, [userIsLoggedIn]);

    if (isLoading) {
        return <Loader />;
    }

    return <div>{children}</div>;
}

export default AuthStateProvider;
