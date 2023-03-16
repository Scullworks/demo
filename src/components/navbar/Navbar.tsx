import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
    const [showMenuIcon, setShowMenuIcon] = useState(true);
    const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

    const navRef = useRef<HTMLUListElement | null>(null);

    function scrollToTop() {
        if (typeof window === 'undefined') return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navRef.current?.classList.remove('navbar__responsive');
        setShowMenuIcon(true);
    }

    function toggleNavbar() {
        if (!isTabletOrSmaller) return;
        navRef.current?.classList.toggle('navbar__responsive');
        setShowMenuIcon(prevState => !prevState);
    }

    useEffect(() => {
        function checkWindowWidth() {
            if (window.innerWidth <= 768) {
                setIsTabletOrSmaller(true);
            } else {
                setIsTabletOrSmaller(false);
            }
        }

        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        };
    }, [isTabletOrSmaller]);

    return (
        <>
            <nav className="navbar">
                <h3 className="navbar__heading" onClick={scrollToTop}>
                    ScullWorks
                </h3>
                <ul className={'navbar__list'} ref={navRef}>
                    <li>
                        <ScrollLink to="about" smooth={true} duration={500} onClick={toggleNavbar}>
                            About
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="contact-us"
                            smooth={true}
                            duration={500}
                            onClick={toggleNavbar}
                        >
                            Contact Us
                        </ScrollLink>
                    </li>
                    <Link href="/signin">
                        <button className="navbar__login">Login</button>
                    </Link>
                </ul>
                <>
                    {showMenuIcon ? (
                        <IconButton className="navbar__menu" onClick={toggleNavbar} disableRipple>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <IconButton className="navbar__close" onClick={toggleNavbar} disableRipple>
                            <CloseIcon />
                        </IconButton>
                    )}
                </>
            </nav>
        </>
    );
}

export default Navbar;
