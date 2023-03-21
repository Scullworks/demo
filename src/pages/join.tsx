import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuthStore, UserType } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

function Join() {
    const setUserType = useAuthStore(state => state.setUserType);

    const router = useRouter();

    function onClick(userType: UserType) {
        setUserType(userType);
        router.push('/register');
    }

    return (
        <motion.div className="join" {...pageTransitions}>
            <h1 className="join__heading">Who Are You?</h1>
            <div className="join__options">
                <button className="button" onClick={() => onClick('athlete')}>
                    Athlete
                </button>
                <button className="button" onClick={() => onClick('club')}>
                    Club
                </button>
                <button className="button" onClick={() => onClick('coach')}>
                    Coach
                </button>
            </div>
        </motion.div>
    );
}

export default Join;
