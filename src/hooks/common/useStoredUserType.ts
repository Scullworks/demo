export function useStoredUserType() {
    if (typeof window !== 'undefined') {
        const storedUserType = localStorage.getItem('user');
        return { storedUserType };
    }

    return { storedUserType: null };
}
