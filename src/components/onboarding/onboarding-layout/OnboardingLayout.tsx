import { PropsWithChildren, useEffect, useState } from 'react';
import { AlertDialog, AuthStateProvider, PageAnimation, ProgressStepper } from '@/components';
import { useStoredUserType } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store';
import { UserType } from '@/models';

function Onboarding({ children }: PropsWithChildren) {
    return (
        <div className="onboarding">
            <PageAnimation>{children}</PageAnimation>
            <ProgressStepper />
        </div>
    );
}

function OnboardingLayout({ children }: PropsWithChildren) {
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
                <Onboarding>{children}</Onboarding>
            ) : (
                <AlertDialog openDialog={showDialog} setOpenDialog={setShowDialog} />
            )}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
