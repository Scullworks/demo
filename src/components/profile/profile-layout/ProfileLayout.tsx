import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
    AuthStateProvider,
    ClubProfileMenu,
    Loader,
    PageAnimation,
    ProfileMenu
} from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { CollectionName } from '@/models';

interface ProfileLayoutProps {
    readonly for: CollectionName;
}

function ProfileLayout(props: PropsWithChildren<ProfileLayoutProps>) {
    const { for: collectionName, children } = props;

    const [showLoader, setShowLoader] = useState(false);

    const { data } = useEnsureFirebaseDocQuery(collectionName);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobile = isMobileRef.current;

    const { userHasCompletedOnboarding, userType } = useLocalStorage();

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
            {data && (
                <div className="profile">
                    {collectionName === 'clubs' ? (
                        <ClubProfileMenu />
                    ) : (
                        <ProfileMenu for={collectionName} />
                    )}
                    <PageAnimation className="profile-main" isMobile={isMobile}>
                        {children}
                    </PageAnimation>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ProfileLayout;
