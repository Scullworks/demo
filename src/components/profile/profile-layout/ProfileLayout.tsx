import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AuthStateProvider, ClubProfileMenu, ProfileMenu } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { CollectionName } from '@/models';
import { pageTransitions } from '@/utils/animations/pages';

interface ProfileLayoutProps {
    readonly for: CollectionName;
    readonly children: ReactNode;
}

function ProfileLayout(props: ProfileLayoutProps) {
    const { for: collectionName, children } = props;

    const { data } = useEnsureFirebaseDocQuery(collectionName);

    return (
        <AuthStateProvider>
            {data && (
                <div className="profile">
                    {collectionName === 'clubs' ? (
                        <ClubProfileMenu />
                    ) : (
                        <ProfileMenu for={collectionName} />
                    )}
                    <motion.div className="profile-main" {...pageTransitions}>
                        {children}
                    </motion.div>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ProfileLayout;
