import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { About, ContactUs, Header, Navbar } from '@/components';
import { useAnimationStore } from '@/hooks/store/useAnimationStore';
import { pageTransitions } from '@/utils/animations/pages';

function Home() {
    const isInitialLoad = useAnimationStore(state => state.isInitialLoad);
    const setIsInitialLoad = useAnimationStore(state => state.setIsInitialLoad);

    useEffect(() => {
        function cleanup() {
            if (isInitialLoad) setIsInitialLoad(false);
        }

        return cleanup();
    }, [isInitialLoad, setIsInitialLoad]);

    return (
        <>
            <Navbar />
            <motion.div custom={isInitialLoad} {...pageTransitions}>
                <Header />
                <About />
                <ContactUs />
            </motion.div>
        </>
    );
}

export default Home;
