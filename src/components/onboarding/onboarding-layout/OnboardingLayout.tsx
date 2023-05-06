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

    const [showLoader, setShowLoader] = useState(false);

    const {
        userHasCompletedOnboarding,
        storageIsEmpty,
        userType: storageUserType
    } = useLocalStorage();

    const openDialog = !storageIsEmpty && typeof storageUserType !== 'string';

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
            {userType ? <Onboarding>{children}</Onboarding> : <AlertDialog open={openDialog} />}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
