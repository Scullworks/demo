import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { pageTransitions } from '@/utils/animations/pages';

interface PageAnimationProps {
    readonly className?: string;
    readonly custom?: boolean;
    readonly isMobile?: boolean;
}

function PageAnimation(props: PropsWithChildren<PageAnimationProps>) {
    const { className, custom, isMobile, children } = props;

    if (isMobile) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div className={className} custom={custom} {...pageTransitions}>
            {children}
        </motion.div>
    );
}

export default PageAnimation;
