export function useLocalStorage() {
    const userType = typeof window !== 'undefined' && localStorage.getItem('user');

    return { userType };
}
