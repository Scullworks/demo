import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import { auth } from '@/services/firebase';

interface AuthStateProviderProps {
    readonly children: ReactNode;
}

function AuthStateProvider({ children }: AuthStateProviderProps) {
    const [isLoading, setIsLoading] = useState(false);

    const userLoggedOut = useAuthStore(state => state.userLoggedOut);
    const setCurrentUser = useAuthStore(state => state.setUser);

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setIsLoading(true);

            if (user) {
                setCurrentUser(user);
                setIsLoading(false);
            } else {
                setCurrentUser(null);
                if (!userLoggedOut) localStorage.setItem('path', router.asPath);
                router.replace('/login');
            }
        });
    }, [setCurrentUser, userLoggedOut, router]);

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
