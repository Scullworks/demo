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
import { FirebaseClubWithImage } from '@/models';

interface ProfileMenuProps {
    readonly club: FirebaseClubWithImage;
}

function ProfileMenu({ club }: ProfileMenuProps) {
    const { profileImageRef, name } = club;

    const router = useRouter();

    const currentRoute = router.pathname;
    const className = 'profile-menu__link';
    const dashboardClassName = currentRoute === '/profile/club' ? 'active' : className;
    const membersClassName = currentRoute === '/profile/members' ? 'active' : className;
    const paymentsClassName = currentRoute === '/profile/payments' ? 'active' : className;
    const sessionsClassName = currentRoute === '/profile/sessions' ? 'active' : className;
    const boatsClassName = currentRoute === '/profile/boats' ? 'active' : className;
    const servicesClassName = currentRoute === '/profile/services' ? 'active' : className;

    return (
        <aside className="profile-menu">
            {/* Logo */}
            <h3>ScullWorks</h3>

            {/* Club Info */}
            <div className="profile-menu__user">
                <Avatar profileImage={profileImageRef} name={name} />
                <h3>{name}</h3>
            </div>

            {/* Button Links */}
            <div className="profile-menu__links">
                <Link className={dashboardClassName} href="club">
                    <HomeIcon />
                    Dashboard
                </Link>
                <Link className={membersClassName} href="members">
                    <PeopleIcon />
                    Members
                </Link>
                <Link className={paymentsClassName} href="payments">
                    <PaymentIcon />
                    Payments
                </Link>
                <Link className={sessionsClassName} href="sessions">
                    <RowingIcon />
                    Sessions
                </Link>
                <Link className={boatsClassName} href="boats">
                    <Image src={boatIcon} alt="boat" width={24} />
                    Boats
                </Link>
                <Link className={servicesClassName} href="services">
                    <FormatListBulletedIcon />
                    Services
                </Link>
            </div>
        </aside>
    );
}

export default ProfileMenu;
