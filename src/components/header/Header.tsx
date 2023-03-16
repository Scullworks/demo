import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import headerBackground from '@/assets/header/background.png';
import header from '@/assets/header/main.png';
import { useAnimationStore } from '@/hooks/store/useAnimationStore';
import content from '@/utils/content/header.json';
import { benefitsVariants, textVariants } from './Header.animations';

function Header() {
    const benefitsRef = useRef<HTMLDivElement | null>(null);
    const benefitsInView = useInView(benefitsRef, { once: true });
    const setHeaderBenefitsIsInView = useAnimationStore(state => state.setHeaderBenefitsIsInView);

    useEffect(() => {
        setHeaderBenefitsIsInView(benefitsInView);
    }, [benefitsInView, setHeaderBenefitsIsInView]);

    return (
        <header className="header">
            <div className="header__container">
                <motion.div
                    className="header__text-container"
                    initial="initial"
                    animate="animate"
                    variants={textVariants}
                >
                    <h1 className="header__heading">
                        Take rowing to <span>the next level</span>
                    </h1>
                    <p className="header__text">{content.header}</p>
                    <Link href="/">
                        <button className="header__button">Join Now</button>
                    </Link>
                </motion.div>
                <div className="header__images">
                    <Image className="header__image" src={header} alt="header" />
                    <Image
                        className="header__image--background"
                        src={headerBackground}
                        alt="header background"
                        priority
                    />
                    <motion.div
                        className="header__image-benefits"
                        ref={benefitsRef}
                        initial="initial"
                        whileInView="animate"
                        variants={benefitsVariants}
                        viewport={{ once: true }}
                    >
                        <span>100+ Clubs</span>
                        <span className="header__image-benefits--divider" />
                        <span>Find your nearest club & enjoy the benefits</span>
                        <span className="header__image-benefits--cta">Choose your club</span>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}

export default Header;
