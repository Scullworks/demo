import Link from 'next/link';
import { AuthForm, AuthProviders, PageAnimation } from '@/components';

function Register() {
    return (
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
    );
}

export default Register;
