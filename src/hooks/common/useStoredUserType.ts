export function useStoredUserType() {
    if (typeof window !== 'undefined') {
        const storedUserType = localStorage.getItem('user-type');
        return { storedUserType };
    }

    return { storedUserType: null };
}
