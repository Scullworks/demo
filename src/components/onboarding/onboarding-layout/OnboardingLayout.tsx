import { PropsWithChildren, useState } from 'react';
import { AlertDialog, AuthStateProvider, PageAnimation, ProgressStepper } from '@/components';
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

    const [showDialog, setShowDialog] = useState(userType === null);

    return (
        <AuthStateProvider>
            {userType ? (
                <Onboarding>{children}</Onboarding>
            ) : (
                <AlertDialog open={showDialog} setOpen={setShowDialog} />
            )}
        </AuthStateProvider>
    );
}

export default OnboardingLayout;
