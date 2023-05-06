import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    AuthForm,
    AuthProviders,
    AuthStateProvider,
    Loader,
    PageAnimation,
    PageTitle
} from '@/components';
import { useLocalStorage } from '@/hooks/common';

function Register() {
    const [showLoader, setShowLoader] = useState(false);
    const { userHasStartedOnboarding, userHasCompletedOnboarding } = useLocalStorage();

    useEffect(() => {
        if (userHasStartedOnboarding || userHasCompletedOnboarding) setShowLoader(true);
    }, [userHasStartedOnboarding, userHasCompletedOnboarding]);

    if (showLoader) {
        return (
            <AuthStateProvider isAuthRoute>
                <Loader />
            </AuthStateProvider>
        );
    }

    return (
        <AuthStateProvider isAuthRoute>
            <PageTitle text="Register" />
            <PageAnimation className="auth">
                <h1 className="auth__heading">Create Account</h1>
                <p className="auth__text">
                    Already have an account?{' '}
                    <Link className="auth__link" href="/login">
                        Login
                    </Link>
                </p>
                <AuthForm as="register" />
                <AuthProviders />
            </PageAnimation>
        </AuthStateProvider>
    );
}

export default Register;
