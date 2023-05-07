import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/common';
import {
    useAthleteOnboardingStore,
    useClubOnboardingStore,
    useCommonOnboardingStore
} from '@/hooks/store';
import { UserType } from '@/models';

import { signOutUser } from '@/services/firebase';

interface LinkProps {
    readonly label?: never;
    readonly to: string;
    readonly icon: ReactNode;
    readonly userType?: UserType;
    readonly home?: never;
    readonly logout?: never;
}

interface HomeProps {
    readonly label: string;
    readonly to?: never;
    readonly icon: ReactNode;
    readonly userType?: UserType;
    readonly home?: boolean;
    readonly logout?: never;
}

interface LogoutProps {
    readonly label?: never;
    readonly to?: never;
    readonly icon?: never;
    readonly userType?: never;
    readonly home?: never;
    readonly logout: boolean;
}

type MenuLinkProps = LinkProps | HomeProps | LogoutProps;

function MenuLink(props: MenuLinkProps) {
    const { label, to: href, icon: Icon, userType = 'club', home } = props as LinkProps;
    const { logout } = props as LogoutProps;

    const resetCommonStore = useCommonOnboardingStore(state => state.reset);
    const resetClubStore = useClubOnboardingStore(state => state.reset);
    const resetAthleteStore = useAthleteOnboardingStore(state => state.reset);

    const router = useRouter();

    const { clearStorage } = useLocalStorage();

    const baseRoute = `/profile/${userType}`;
    const currentRoute = router.pathname;
    const hrefRoute = home ? baseRoute : baseRoute + '/' + href;

    const className = 'profile-menu__link';
    const homeClassName = currentRoute === baseRoute ? 'active' : className;
    const linkClassName = currentRoute.includes(`/profile/club/${href}`) ? 'active' : className;

    async function onLogoutClick() {
        clearStorage();
        resetCommonStore();
        resetClubStore();
        resetAthleteStore();
        await signOutUser();
    }

    return (
        <>
            {logout ? (
                <Link className={className} href="" onClick={onLogoutClick}>
                    <LogoutIcon />
                    Logout
                </Link>
            ) : (
                <Link className={home ? homeClassName : linkClassName} href={hrefRoute}>
                    {Icon}
                    {home ? label : href}
                </Link>
            )}
        </>
    );
}

export default MenuLink;
