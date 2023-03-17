import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
    initial: (isInitialLoad: boolean) => ({
        opacity: isInitialLoad ? 1 : 0,
        x: isInitialLoad ? 0 : '100vw'
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            bounce: 0.2,
            duration: 0.5
        }
    },
    exit: {
        x: '-100vw',
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: 'easeInOut'
        }
    }
};

export const pageTransitions = {
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    variants: pageVariants
};
