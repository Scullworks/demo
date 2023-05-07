import { PropsWithChildren, useEffect, useState } from 'react';
import {
    AlertDialog,
    AuthStateProvider,
    Loader,
    PageAnimation,
    ProgressStepper
} from '@/components';
import { useLocalStorage } from '@/hooks/common';
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
    const userType = useAuthStore(state => state.userType);
    const setUserType = useAuthStore(state => state.setUserType);

    const {
        userHasCompletedOnboarding,
        storageIsEmpty,
        userType: storageUserType
    } = useLocalStorage();

    const [showLoader, setShowLoader] = useState(false);
    const [openDialog, setOpenDialog] = useState(
        !storageIsEmpty && typeof storageUserType !== 'string'
    );

    useEffect(() => {
        if (!userType && storageUserType) setUserType(storageUserType as UserType);
    }, [setUserType, storageUserType, userType]);

    useEffect(() => {
        if (userHasCompletedOnboarding) setShowLoader(true);
    }, [userHasCompletedOnboarding]);

    if (showLoader) {
        return (
            <AuthStateProvider isOnboardingRoute>
                <Loader />
            </AuthStateProvider>
        );
    }

    return (
        <AuthStateProvider isOnboardingRoute>
            {userType ? (
                <Onboarding>{children}</Onboarding>
            ) : (
                <AlertDialog open={openDialog} setOpen={setOpenDialog} />
            )}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
