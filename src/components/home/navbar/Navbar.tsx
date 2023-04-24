import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '@/assets/logos/scullworks.svg';
import { pageVariants } from '@/utils/animations/pages';

function Navbar() {
    const [showMenuIcon, setShowMenuIcon] = useState(true);

    const navRef = useRef<HTMLUListElement | null>(null);
    const isTabletOrSmallerRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 768);
    const isTabletOrSmaller = isTabletOrSmallerRef.current;

    function scrollToTop() {
        if (typeof window === 'undefined') return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navRef.current?.classList.remove('navbar__responsive');
        setShowMenuIcon(true);
    }

    function scrollToSection() {
        if (!isTabletOrSmaller) return;
        navRef.current?.classList.remove('navbar__responsive');
        setShowMenuIcon(prevState => !prevState);
    }

    function showNavbar() {
        if (!isTabletOrSmaller) return;
        navRef.current?.classList.add('navbar__responsive');
        navRef.current?.classList.remove('navbar__responsive--exit');
        setShowMenuIcon(prevState => !prevState);
    }

    function hideNavbar() {
        if (!isTabletOrSmaller) return;
        navRef.current?.classList.remove('navbar__responsive');
        navRef.current?.classList.add('navbar__responsive--exit');
        setShowMenuIcon(prevState => !prevState);
    }

    return (
        <>
            <motion.nav className="navbar" exit="exit" variants={pageVariants}>
                <div className="navbar__logo">
                    <Image src={logo} alt="ScullWorks logo" height={40} onClick={scrollToTop} />
                </div>
                <ul className={'navbar__list'} ref={navRef}>
                    <li>
                        <ScrollLink
                            to="about"
                            smooth={true}
                            duration={500}
                            onClick={scrollToSection}
                        >
                            About
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="contact-us"
                            smooth={true}
                            duration={500}
                            onClick={scrollToSection}
                        >
                            Contact Us
                        </ScrollLink>
                    </li>
                    <Link href="/login">
                        <button className="navbar__login button">Login</button>
                    </Link>
                </ul>
                <>
                    {showMenuIcon ? (
                        <IconButton className="navbar__menu" onClick={showNavbar} disableRipple>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <IconButton className="navbar__close" onClick={hideNavbar} disableRipple>
                            <CloseIcon />
                        </IconButton>
                    )}
                </>
            </motion.nav>
        </>
    );
}

export default Navbar;
