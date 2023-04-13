import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthForm, AuthProviders } from '@/components';
import { useAuthStore } from '@/hooks/store';
import { getUserFromFirebase } from '@/services/firebase';

function Login() {
    const user = useAuthStore(state => state.user);
    const router = useRouter();

    /**
     Keep track of the original path a user was attempting to go to, 
     before being redirected due to not being authenticated. Once they 
     are authenticated remove the path from storage and redirect them 
     to the requested path.
     */
    useEffect(() => {
        const originalPathRequest = localStorage.getItem('path');

        async function redirect() {
            if (user && originalPathRequest) {
                localStorage.removeItem('path');
                router.replace(originalPathRequest);
                return;
            }

            if (user) {
                const { userDoc } = await getUserFromFirebase(user.uid);
                router.push(`/profile/${userDoc?.type}`);
            }
        }

        redirect();
    }, [user, router]);

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
