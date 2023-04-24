import { Variants } from 'framer-motion';

export const contactUsVariants: Variants = {
    initial: (isMobile: boolean) => ({
        opacity: isMobile ? 1 : 0
    }),
    animate: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.3
        }
    }
};

export const animations = {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true },
    variants: contactUsVariants
};
