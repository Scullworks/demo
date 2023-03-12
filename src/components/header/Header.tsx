import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import headerBackground from '@/assets/header-background.png';
import header from '@/assets/header.png';
import content from '@/utils/home-content.json';

const textVariants: Variants = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8
        }
    }
};

const benefitsVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 0.8,
            duration: 0.8
        }
    }
};

function Header() {
    return (
        <div className="header">
            <motion.div
                className="header__text-container"
                variants={textVariants}
                initial="initial"
                animate="animate"
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
                    variants={benefitsVariants}
                    initial="initial"
                    whileInView="animate"
                >
                    <span>100+ Clubs</span>
                    <span className="header__image-benefits--divider" />
                    <span>Find your nearest club & enjoy the benefits</span>
                    <span className="header__image-benefits--cta">Choose your club</span>
                </motion.div>
            </div>
        </div>
    );
}

export default Header;
