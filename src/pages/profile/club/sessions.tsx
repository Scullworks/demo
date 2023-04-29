import { ProfileLayout, CreateSessionSuccess, SessionForm, PageTitle } from '@/components';
import { useCreateSession } from '@/hooks/pages';

function Sessions() {
    const { showSuccess, setShowSuccess, ...sessionFormProps } = useCreateSession();

    return (
        <>
            <PageTitle text="Create Session" />
            <ProfileLayout for="clubs">
                {showSuccess ? (
                    <CreateSessionSuccess setShowSuccess={setShowSuccess} />
                ) : (
                    <SessionForm {...sessionFormProps} />
                )}
            </ProfileLayout>
        </>
    );
}

export default Sessions;
