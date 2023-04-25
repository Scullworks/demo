import { PropagateLoader } from 'react-spinners';
import { BoatsForm, OnboardingLayout } from '@/components';
import { useBoats } from '@/hooks/pages';

function Boats() {
    const { isCreatingAccount, ...boatFormProps } = useBoats();

    if (isCreatingAccount) {
        return (
            <div className="loading">
                <PropagateLoader color="rgb(255, 179, 109)" />
                <p>Please wait while we create your account</p>
            </div>
        );
    }

    return (
        <OnboardingLayout>
            <h1>Club Boats</h1>
            <BoatsForm {...boatFormProps} />
        </OnboardingLayout>
    );
}

export default Boats;
