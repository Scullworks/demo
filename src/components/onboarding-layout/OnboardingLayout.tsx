import { ReactNode } from 'react';
import { ProgressStepper } from '@/components';

interface OnboardingLayoutProps {
    readonly children: ReactNode;
}

function OnboardingLayout({ children }: OnboardingLayoutProps) {
    return (
        <>
            {children}
            <ProgressStepper />
        </>
    );
}

export default OnboardingLayout;
