import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthForm, AuthProviders } from '@/components';
import { useAuthStore } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

function Register() {
    const user = useAuthStore(state => state.user);
    const router = useRouter();

    useEffect(() => {
        const originalPathRequest = localStorage.getItem('path');

        if (user && originalPathRequest) {
            localStorage.removeItem('path');
            router.replace(originalPathRequest);
        }
    }, [user, router]);

    return (
        <motion.div className="auth" {...pageTransitions}>
            <h1 className="auth__heading">Create Account</h1>
            <p className="auth__text">
                Already have an account?{' '}
                <Link className="auth__link" href="/login">
                    Login
                </Link>
            </p>
            <AuthForm type="register" />
            <AuthProviders />
        </motion.div>
    );
}

export default Register;
