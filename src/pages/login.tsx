import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthForm, AuthProviders } from '@/components';
import { useStoredUserType } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store';
import { getUserFromFirebase } from '@/services/firebase';

function Login() {
    const [routeToChangeTo, setRouteToChangeTo] = useState<string | null>(null);

    const user = useAuthStore(state => state.user);
    const userLoggedOut = useAuthStore(state => state.userLoggedOut);

    const { storedUserType } = useStoredUserType();
    const queryClient = useQueryClient();
    const router = useRouter();

    /**
     Keep track of the original path a user was attempting to go to, 
     before being redirected due to not being authenticated. Once they 
     are authenticated remove the path from storage and redirect them 
     to the requested path.
     */
    useEffect(() => {
        let mounted = true;
        // const originalPathRequest = localStorage.getItem('path');

        async function redirect() {
            if (!user || !mounted) return;

            // if (userLoggedOut) localStorage.removeItem('path');

            // if (originalPathRequest && !userLoggedOut) {
            //     localStorage.removeItem('path');
            //     setRouteToChangeTo(originalPathRequest);
            //     return;
            // }

            // if (storedUserType) {
            //     setRouteToChangeTo(`/profile/${storedUserType}`);
            //     return;
            // }

            const { userDoc } = await getUserFromFirebase(user.uid);

            if (userDoc) {
                localStorage.setItem('user', userDoc.type);
                await queryClient.resetQueries();
                setRouteToChangeTo(`/profile/${userDoc.type}`);
            }
        }

        redirect();

        return () => {
            mounted = false;
        };
    }, [user, userLoggedOut, storedUserType, queryClient, router]);

    useEffect(() => {
        if (routeToChangeTo) router.push(routeToChangeTo);
    }, [routeToChangeTo, router]);

    return (
        <div className="auth">
            <h1 className="auth__heading">Welcome Back</h1>
            <p className="auth__text">
                Don&apos;t have an account?{' '}
                <Link className="auth__link" href="/register">
                    Register
                </Link>
            </p>
            <AuthForm as="login" />
            <AuthProviders />
        </div>
    );
}

export default Login;
