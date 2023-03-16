import { Variants } from 'framer-motion';

export const headingVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: (headerBenefitsIsInView: boolean) => ({
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: headerBenefitsIsInView ? 0 : 1
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
            delayChildren: headerBenefitsIsInView ? 0.5 : 1.5,
            staggerChildren: 0.5
        }
    })
};

const transitionOptions = {
    transition: {
        duration: 0.5,
        ease: 'easeOut'
    }
};

export const athletesVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        ...transitionOptions
    }
};

export const clubsVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        ...transitionOptions
    }
};

export const coachesVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        ...transitionOptions
    }
};

export const buttonVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: (headerBenefitsIsInView: boolean) => ({
        opacity: 1,
        transition: {
            delay: headerBenefitsIsInView ? 0.5 : 1,
            duration: 0.5,
            ease: 'easeOut'
        }
    })
};

export const animations = {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: true }
};
