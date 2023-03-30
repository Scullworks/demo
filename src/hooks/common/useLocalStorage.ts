export function useLocalStorage() {
    function clearOnboardingStores() {
        localStorage.removeItem('onboarding');
        localStorage.removeItem('athlete-onboarding');
        localStorage.removeItem('club-onboarding');
        localStorage.removeItem('coach-onboarding');
        localStorage.removeItem('image');
    }

    return { clearOnboardingStores };
}
