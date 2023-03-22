import { Variants } from 'framer-motion';

export const textVariants: Variants = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.8
        }
    }
};

export const benefitsVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 1.3,
            duration: 0.5
        }
    }
};
