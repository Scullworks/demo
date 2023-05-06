import { UserType } from '@/models';

export function useLocalStorage() {
    const isBrowser = typeof window !== 'undefined';

    const userType = isBrowser && localStorage.getItem('user');
    const userHasStartedOnboarding = isBrowser && localStorage.getItem('started');
    const userHasCompletedOnboarding = isBrowser && localStorage.getItem('completed');
    const userIsLoggedIn = isBrowser && localStorage.getItem('in');
    const storageIsEmpty = isBrowser && localStorage.length === 0;

    function setStorageLoggedIn() {
        localStorage.setItem('in', 'true');
    }

    function setStorageUserType(type: UserType) {
        localStorage.setItem('user', type);
    }

    function setStorageCompletedOnboarding() {
        localStorage.setItem('completed', 'true');
    }

    function setStorageStartedOnboarding() {
        localStorage.setItem('started', 'true');
    }

    function clearStorageStartedOnboarding() {
        localStorage.removeItem('started');
    }

    function clearStorage() {
        localStorage.clear();
    }

    return {
        userType,
        userHasStartedOnboarding,
        userHasCompletedOnboarding,
        storageIsEmpty,
        userIsLoggedIn,
        setStorageLoggedIn,
        setStorageUserType,
        setStorageCompletedOnboarding,
        setStorageStartedOnboarding,
        clearStorageStartedOnboarding,
        clearStorage
    };
}
