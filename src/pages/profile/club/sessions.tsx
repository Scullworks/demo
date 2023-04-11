import { ClubProfileLayout, CreateSessionSuccess, SessionForm } from '@/components';
import { useCreateSession } from '@/hooks/pages';

function Sessions() {
    const { showSuccess, setShowSuccess, ...sessionFormProps } = useCreateSession();

    return (
        <ClubProfileLayout>
            {showSuccess ? (
                <CreateSessionSuccess setShowSuccess={setShowSuccess} />
            ) : (
                <SessionForm {...sessionFormProps} />
            )}
        </ClubProfileLayout>
    );
}

export default Sessions;
