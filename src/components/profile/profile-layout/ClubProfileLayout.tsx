import { ReactNode } from 'react';
import { AuthStateProvider, ClubProfileMenu } from '@/components';
import { FirebaseClubWithImage } from '@/models';

interface ClubProfileLayoutProps {
    readonly club: FirebaseClubWithImage | undefined;
    readonly children: ReactNode;
}

function ClubProfileLayout(props: ClubProfileLayoutProps) {
    const { club, children } = props;

    return (
        <AuthStateProvider>
            {club && (
                <div className="profile">
                    <ClubProfileMenu club={club} />
                    <div className="profile-main">{children}</div>
                </div>
            )}
        </AuthStateProvider>
    );
}

export default ClubProfileLayout;
