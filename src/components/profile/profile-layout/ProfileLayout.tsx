import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
    AuthStateProvider,
    ClubProfileMenu,
    Loader,
    PageAnimation,
    ProfileMenu
} from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { useFirebaseDocQuery } from '@/hooks/queries';
import { CollectionName } from '@/models';

interface ProfileLayoutProps {
    readonly for: CollectionName;
}

function ProfileLayout(props: PropsWithChildren<ProfileLayoutProps>) {
    const { for: collectionName, children } = props;

    const [showLoader, setShowLoader] = useState(false);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobile = isMobileRef.current;
    const isClub = collectionName === 'clubs';

    const { userHasCompletedOnboarding, userType, clearStorageSession } = useLocalStorage();

    clearStorageSession();
    useFirebaseDocQuery(collectionName);

    useEffect(() => {
        if (!userHasCompletedOnboarding || !userType) setShowLoader(true);
    }, [userHasCompletedOnboarding, userType]);

    if (showLoader) {
        return (
            <AuthStateProvider isProfileRoute>
                <Loader />
            </AuthStateProvider>
        );
    }

    return (
        <AuthStateProvider isProfileRoute>
            <div className="profile">
                {isClub ? <ClubProfileMenu /> : <ProfileMenu for={collectionName} />}
                <PageAnimation className="profile-main" isMobile={isMobile}>
                    {children}
                </PageAnimation>
            </div>
        </AuthStateProvider>
    );
}

export default ProfileLayout;
