import Link from 'next/link';
import { AuthForm, AuthProviders, AuthStateProvider, PageAnimation, PageTitle } from '@/components';

function Register() {
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
