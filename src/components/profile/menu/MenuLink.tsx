import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
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

    const router = useRouter();

    const BASE_ROUTE = `/profile/${userType}`;
    const CURRENT_ROUTE = router.pathname;
    const HREF_ROUTE = home ? BASE_ROUTE : BASE_ROUTE + '/' + href;

    const className = 'profile-menu__link';
    const homeClassName = CURRENT_ROUTE === BASE_ROUTE ? 'active' : className;
    const linkClassName = CURRENT_ROUTE.includes(`/profile/club/${href}`) ? 'active' : className;

    async function onLogoutClick() {
        localStorage.clear();
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
                <Link className={home ? homeClassName : linkClassName} href={HREF_ROUTE}>
                    {Icon}
                    {home ? label : href}
                </Link>
            )}
        </>
    );
}

export default MenuLink;
