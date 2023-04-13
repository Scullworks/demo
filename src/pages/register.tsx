import { motion } from 'framer-motion';
import Link from 'next/link';
import { AuthForm, AuthProviders } from '@/components';
import { pageTransitions } from '@/utils/animations/pages';

function Register() {
    return (
        <motion.div className="auth" {...pageTransitions}>
            <h1 className="auth__heading">Create Account</h1>
            <p className="auth__text">
                Already have an account?{' '}
                <Link className="auth__link" href="/login">
                    Login
                </Link>
            </p>
            <AuthForm as="register" />
            <AuthProviders />
        </motion.div>
    );
}

export default Register;
