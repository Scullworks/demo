import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import RowingIcon from '@mui/icons-material/Rowing';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { CollectionName } from '@/models';
import { signOutUser } from '@/services/firebase';

interface ProfileMenuProps {
    readonly for: CollectionName;
}

function ProfileMenu(props: ProfileMenuProps) {
    const { for: collectionName } = props;

    const { data } = useEnsureFirebaseDocQuery(collectionName);

    const router = useRouter();

    const currentRoute = router.pathname;
    const className = 'profile-menu__link';
    const dashboardClassName = currentRoute === '/profile/club' ? 'active' : className;
    const athletesClassName = currentRoute === '/profile/club/athletes' ? 'active' : className;
    const paymentsClassName = currentRoute === '/profile/club/payments' ? 'active' : className;
    const sessionsClassName = currentRoute === '/profile/club/sessions' ? 'active' : className;
    const servicesClassName = currentRoute === '/profile/club/services' ? 'active' : className;

    return (
        <aside className="profile-menu">
            {/* Logo */}
            <h3 className="profile-menu__logo">ScullWorks</h3>

            {/* Club Info */}
            <div className="profile-menu__user">
                <Avatar profileImage={data?.profileImageRef} name={data?.name} />
                <h3>{data?.name}</h3>
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
                <Link className={servicesClassName} href="/profile/club/services">
                    <FormatListBulletedIcon />
                    Services
                </Link>
                <Link className={className} href="" onClick={signOutUser}>
                    <LogoutIcon />
                    Logout
                </Link>
            </div>
        </aside>
    );
}

export default ProfileMenu;
