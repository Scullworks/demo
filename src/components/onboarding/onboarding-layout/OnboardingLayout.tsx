import { ReactNode, useEffect, useState } from 'react';
import { AlertDialog, AuthStateProvider, ProgressStepper } from '@/components';
import { useAuthStore } from '@/hooks/store';

interface OnboardingLayoutProps {
    readonly children: ReactNode;
}

function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const [showDialog, setShowDialog] = useState(false);
    const userType = useAuthStore(state => state.userType);

    useEffect(() => {
        if (!userType) setShowDialog(true);
    }, [userType]);

    return (
        <AuthStateProvider>
            {userType ? (
                <>
                    {children}
                    <ProgressStepper />
                </>
            ) : (
                <AlertDialog openDialog={showDialog} setOpenDialog={setShowDialog} />
            )}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
