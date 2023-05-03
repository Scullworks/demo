import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RowingIcon from '@mui/icons-material/Rowing';
import Image from 'next/image';
import logo from '@/assets/logos/scullworks.svg';
import { Avatar } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { CollectionName } from '@/models';
import MenuLink from './MenuLink';

interface ProfileMenuProps {
    readonly for: CollectionName;
}

function ProfileMenu(props: ProfileMenuProps) {
    const { for: collectionName } = props;

    const { data } = useEnsureFirebaseDocQuery(collectionName);

    const isAthlete = collectionName === 'athletes';
    const userType = isAthlete ? 'athlete' : 'coach';

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
                <Avatar profileImage={data?.profileImageRef} name={data?.name} isProfileMenu />
                <h3>{data?.name}</h3>
            </div>

            <div className="profile-menu__links">
                <MenuLink label="schedule" icon={<CalendarMonthIcon />} userType={userType} home />
                {isAthlete && <MenuLink to="sessions" icon={<RowingIcon />} userType={userType} />}
                <MenuLink logout />
            </div>
        </aside>
    );
}

export default ProfileMenu;
