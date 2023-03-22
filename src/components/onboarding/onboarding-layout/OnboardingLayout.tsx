import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { AlertDialog, AuthStateProvider, ProgressStepper } from '@/components';
import { useStoredUserType } from '@/hooks';
import { useAuthStore, UserType } from '@/hooks/store';
import { pageTransitions } from '@/utils/animations/pages';

interface OnboardingLayoutProps {
    readonly children: ReactNode;
}

function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const [showDialog, setShowDialog] = useState(false);

    const userType = useAuthStore(state => state.userType);
    const setUserType = useAuthStore(state => state.setUserType);

    const { storedUserType } = useStoredUserType();

    useEffect(() => {
        if (!userType && !storedUserType) setShowDialog(true);
        if (storedUserType && !userType) setUserType(storedUserType as UserType);
    }, [userType, storedUserType, setUserType]);

    return (
        <AuthStateProvider>
            {userType ? (
                <>
                    <motion.div className="onboarding" {...pageTransitions}>
                        {children}
                    </motion.div>
                    <ProgressStepper />
                </>
            ) : (
                <AlertDialog openDialog={showDialog} setOpenDialog={setShowDialog} />
            )}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
