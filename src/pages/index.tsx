import { useRef } from 'react';
import { About, ContactUs, Header, Navbar, PageAnimation, PageTitle } from '@/components';
import { useAnimationStore } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

function Home() {
    const isInitialLoad = useAnimationStore(state => state.isInitialLoad);
    const setIsInitialLoad = useAnimationStore(state => state.setIsInitialLoad);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobile = isMobileRef.current;

    if (isInitialLoad) setIsInitialLoad(false);

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
