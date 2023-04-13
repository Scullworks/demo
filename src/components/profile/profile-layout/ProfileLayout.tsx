import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AuthStateProvider, ProfileMenu } from '@/components';
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
                    <ProfileMenu for="clubs" />
                    <motion.div className="profile-main" {...pageTransitions}>
                        {children}
                    </motion.div>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ProfileLayout;
