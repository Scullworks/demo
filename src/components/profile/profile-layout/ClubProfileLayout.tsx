import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AuthStateProvider, ClubProfileMenu } from '@/components';
import { FirebaseClub } from '@/models';
import { pageTransitions } from '@/utils/animations/pages';

interface ClubProfileLayoutProps {
    readonly club: FirebaseClub | undefined;
    readonly children: ReactNode;
}

function ClubProfileLayout(props: ClubProfileLayoutProps) {
    const { club, children } = props;

    return (
        <AuthStateProvider>
            {club && (
                <div className="profile">
                    <ClubProfileMenu club={club} />
                    <motion.div className="profile-main" {...pageTransitions}>
                        {children}
                    </motion.div>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ClubProfileLayout;
