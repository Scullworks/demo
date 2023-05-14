import Link from 'next/link';
import {
    AuthForm,
    AuthProviders,
    AuthStateProvider,
    Loader,
    PageAnimation,
    PageTitle
} from '@/components';
import { useLocalStorage } from '@/hooks/common';

function Login() {
    const { userHasStartedOnboarding, userHasCompletedOnboarding, userIsLoggedIn } =
        useLocalStorage();

    if ((userHasStartedOnboarding || userHasCompletedOnboarding) && userIsLoggedIn) {
        return (
            <AuthStateProvider isAuthRoute>
                <Loader />
            </AuthStateProvider>
        );
    }

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
