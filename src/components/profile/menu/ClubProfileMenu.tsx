import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import RowingIcon from '@mui/icons-material/Rowing';
import Image from 'next/image';
import logo from '@/assets/logos/scullworks.svg';
import { Avatar } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { FirebaseClub } from '@/models';
import MenuLink from './MenuLink';

function ClubProfileMenu() {
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');

    return (
        <aside className="profile-menu">
            <div className="profile-menu__header">
                <Image
                    className="profile-menu__logo logo"
                    src={logo}
                    alt="ScullWorks logo"
                    height={40}
                    priority
                />
                <Avatar profileImage={club?.profileImageRef} name={club?.name} isProfileMenu />
                <h3>{club?.name}</h3>
            </div>

            <div className="profile-menu__links">
                <MenuLink label="dashboard" icon={<HomeIcon />} home />
                <MenuLink to="athletes" icon={<PeopleIcon />} />
                <MenuLink to="payments" icon={<PaymentIcon />} />
                <MenuLink to="sessions" icon={<RowingIcon />} />
                <MenuLink to="services" icon={<FormatListBulletedIcon />} />
                <MenuLink logout />
            </div>
        </aside>
    );
}

export default ClubProfileMenu;
