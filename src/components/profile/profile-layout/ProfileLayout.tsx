import { PropsWithChildren, useRef } from 'react';
import { AuthStateProvider, ClubProfileMenu, PageAnimation, ProfileMenu } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { CollectionName } from '@/models';

interface ProfileLayoutProps {
    readonly for: CollectionName;
}

function ProfileLayout(props: PropsWithChildren<ProfileLayoutProps>) {
    const { for: collectionName, children } = props;

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 500);
    const isMobile = isMobileRef.current;

    const { data } = useEnsureFirebaseDocQuery(collectionName);

    return (
        <AuthStateProvider>
            {data && (
                <div className="profile">
                    {collectionName === 'clubs' ? (
                        <ClubProfileMenu key={data.uid} />
                    ) : (
                        <ProfileMenu for={collectionName} key={data.uid} />
                    )}
                    <PageAnimation className="profile-main" isMobile={isMobile} key={data.uid}>
                        {children}
                    </PageAnimation>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ProfileLayout;
