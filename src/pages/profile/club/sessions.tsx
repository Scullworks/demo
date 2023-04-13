import { ProfileLayout, CreateSessionSuccess, SessionForm } from '@/components';
import { useCreateSession } from '@/hooks/pages';

function Sessions() {
    const { showSuccess, setShowSuccess, ...sessionFormProps } = useCreateSession();

    return (
        <ProfileLayout for="clubs">
            {showSuccess ? (
                <CreateSessionSuccess setShowSuccess={setShowSuccess} />
            ) : (
                <SessionForm {...sessionFormProps} />
            )}
        </ProfileLayout>
    );
}

export default Sessions;
