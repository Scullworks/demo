import { Variants } from 'framer-motion';

export const contactUsVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.5
        }
    }
};

export const animations = {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true },
    variants: contactUsVariants
};
