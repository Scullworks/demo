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
                className="header__text"
                variants={textVariants}
                initial="initial"
                animate="animate"
            >
                <h1>
                    Take rowing to <span> the next level</span>
                </h1>
                <p>{content.header}</p>
                <Link href="/">
                    <button>Join Now</button>
                </Link>
            </motion.div>
            <div className="header__images">
                <Image className="header__image" src={header} alt="header" />
                <Image
                    className="header__background-image"
                    src={headerBackground}
                    alt="header background"
                />
                <motion.div
                    className="header__benefits-image"
                    variants={benefitsVariants}
                    initial="initial"
                    animate="animate"
                >
                    <span>100+ Clubs</span>
                    <span className="header__benefits-image--divider" />
                    <span>Find your nearest club & enjoy the benefits</span>
                    <span className="header__benefits--cta">Choose your club</span>
                </motion.div>
            </div>
        </div>
    );
}

export default Header;
