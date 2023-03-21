import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useAuthStore } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

function Join() {
    const athleteRef = useRef<HTMLButtonElement | null>(null);
    const clubRef = useRef<HTMLButtonElement | null>(null);
    const coachRef = useRef<HTMLButtonElement | null>(null);

    const setUserType = useAuthStore(state => state.setUserType);

    const router = useRouter();

    function onClick() {
        if (athleteRef.current) setUserType('athlete');
        if (clubRef.current) setUserType('club');
        if (coachRef.current) setUserType('coach');

        router.push('/register');
    }

    return (
        <motion.div className="join" {...pageTransitions}>
            <h1 className="join__heading">Who Are You?</h1>
            <div className="join__options">
                <button className="button" ref={athleteRef} onClick={onClick}>
                    Athlete
                </button>
                <button className="button" ref={clubRef} onClick={onClick}>
                    Club
                </button>
                <button className="button" ref={coachRef} onClick={onClick}>
                    Coach
                </button>
            </div>
        </motion.div>
    );
}

export default Join;
