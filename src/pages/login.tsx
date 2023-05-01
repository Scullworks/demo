import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { AuthForm, AuthProviders, AuthStateProvider, PageAnimation, PageTitle } from '@/components';

function Login() {
    const queryClient = useQueryClient();

    useEffect(() => {
        async function resetQueryClient() {
            await queryClient.resetQueries();
        }

        resetQueryClient();
    }, [queryClient]);

    return (
        <AuthStateProvider isAuthRoute>
            <PageTitle text="Login" />
            <PageAnimation className="auth">
                <h1 className="auth__heading">Welcome Back</h1>
                <p className="auth__text">
                    Don&apos;t have an account?{' '}
                    <Link className="auth__link" href="/register">
                        Register
                    </Link>
                </p>
                <AuthForm as="login" />
                <AuthProviders />
            </PageAnimation>
        </AuthStateProvider>
    );
}

export default Login;
