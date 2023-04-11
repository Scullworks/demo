import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { AuthStateProvider, ClubProfileMenu } from '@/components';
import { useEnsureClubDataQuery } from '@/hooks/queries/useEnsureClubDataQuery';
import { pageTransitions } from '@/utils/animations/pages';

interface ClubProfileLayoutProps {
    readonly children: ReactNode;
}

function ClubProfileLayout({ children }: ClubProfileLayoutProps) {
    const { club } = useEnsureClubDataQuery();

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
