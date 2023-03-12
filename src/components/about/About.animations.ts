import { Variants } from 'framer-motion';

export const headingVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: headerBenefitsIsInView => ({
        opacity: 1,
        transition: {
            duration: 0.8,
            delay: headerBenefitsIsInView ? 0.3 : 1.7
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
            delay: 0.2,
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
            delay: 0.6,
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
            delay: 1,
            ease: 'easeOut'
        }
    }
};
