import { ClubProfileLayout, CreateSessionSuccess, SessionForm } from '@/components';
import { useCreateSession } from '@/hooks/pages';

function Sessions() {
    const { club, showSuccess, setShowSuccess, ...sessionFormProps } = useCreateSession();

    return (
        <ClubProfileLayout club={club}>
            {showSuccess ? (
                <CreateSessionSuccess setShowSuccess={setShowSuccess} />
            ) : (
                <SessionForm {...sessionFormProps} />
            )}
        </ClubProfileLayout>
    );
}

export default Sessions;
