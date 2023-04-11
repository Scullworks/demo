import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import RowingIcon from '@mui/icons-material/Rowing';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import boatIcon from '@/assets/profile/boat.svg';
import { Avatar } from '@/components';
import { FirebaseClub } from '@/models';

interface ClubProfileMenuProps {
    readonly club: FirebaseClub;
}

function ClubProfileMenu({ club }: ClubProfileMenuProps) {
    const { profileImageRef, name } = club;

    const router = useRouter();

    const currentRoute = router.pathname;
    const className = 'profile-menu__link';
    const dashboardClassName = currentRoute === '/profile/club' ? 'active' : className;
    const athletesClassName = currentRoute === '/profile/club/athletes' ? 'active' : className;
    const paymentsClassName = currentRoute === '/profile/club/payments' ? 'active' : className;
    const sessionsClassName = currentRoute === '/profile/club/sessions' ? 'active' : className;
    const boatsClassName = currentRoute === '/profile/club/boats' ? 'active' : className;
    const servicesClassName = currentRoute === '/profile/club/services' ? 'active' : className;

    return (
        <aside className="profile-menu">
            {/* Logo */}
            <h3 className="profile-menu__logo">ScullWorks</h3>

            {/* Club Info */}
            <div className="profile-menu__user">
                <Avatar profileImage={profileImageRef} name={name} />
                <h3>{name}</h3>
            </div>

            {/* Button Links */}
            <div className="profile-menu__links">
                <Link className={dashboardClassName} href="/profile/club">
                    <HomeIcon />
                    Dashboard
                </Link>
                <Link className={athletesClassName} href="/profile/club/athletes">
                    <PeopleIcon />
                    Athletes
                </Link>
                <Link className={paymentsClassName} href="/profile/club/payments">
                    <PaymentIcon />
                    Payments
                </Link>
                <Link className={sessionsClassName} href="/profile/club/sessions">
                    <RowingIcon />
                    Sessions
                </Link>
                <Link className={boatsClassName} href="/profile/club/boats">
                    <Image src={boatIcon} alt="boat" width={24} />
                    Boats
                </Link>
                <Link className={servicesClassName} href="/profile/club/services">
                    <FormatListBulletedIcon />
                    Services
                </Link>
            </div>
        </aside>
    );
}

export default ClubProfileMenu;
