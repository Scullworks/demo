import { Variants } from 'framer-motion';

export const headingVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: (headerBenefitsIsInView: boolean) => ({
        opacity: 1,
        transition: {
            duration: 0.8,
            delay: headerBenefitsIsInView ? 0.3 : 1.7
        }
    })
};

export const aboutVariants: Variants = {
    initial: {
        opacity: 1
    },
    animate: (headerBenefitsIsInView: boolean) => ({
        opacity: 1,
        transition: {
            delayChildren: headerBenefitsIsInView ? 1 : 2,
            staggerChildren: 0.5
        }
    })
};

export const athletesVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

export const clubsVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};

export const coachesVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut'
        }
    }
};
