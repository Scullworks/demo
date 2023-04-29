import { useEffect, useRef } from 'react';
import { About, ContactUs, Header, Navbar, PageAnimation, PageTitle } from '@/components';
import { useAnimationStore } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

function Home() {
    const isInitialLoad = useAnimationStore(state => state.isInitialLoad);
    const setIsInitialLoad = useAnimationStore(state => state.setIsInitialLoad);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobile = isMobileRef.current;

    useEffect(() => {
        function cleanup() {
            if (isInitialLoad) setIsInitialLoad(false);
        }

        return cleanup();
    }, [isInitialLoad, setIsInitialLoad]);

    return (
        <>
            <PageTitle text="ScullWorks | Rowing Management Made Easy" custom />
            <Navbar />
            <PageAnimation custom={isInitialLoad} isMobile={isMobile} {...pageTransitions}>
                <Header />
                <About />
                <ContactUs />
            </PageAnimation>
        </>
    );
}

export default Home;
