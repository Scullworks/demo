import { useRouter } from 'next/router';
import { PageAnimation, PageTitle } from '@/components';
import { useAuthStore } from '@/hooks/store';
import { UserType } from '@/models';

function Join() {
    const setUserType = useAuthStore(state => state.setUserType);

    const router = useRouter();

    function onClick(userType: UserType) {
        localStorage.setItem('user', userType);
        setUserType(userType);
        router.push('/register');
    }

    return (
        <>
            <PageTitle text="Join" />
            <PageAnimation className="join">
                <h1 className="join__heading">Select User Type</h1>
                <div className="join__options">
                    <button className="button" onClick={() => onClick('athlete')}>
                        Athlete
                    </button>
                    <button className="button" onClick={() => onClick('club')}>
                        Club
                    </button>
                    <button className="button" onClick={() => onClick('coach')}>
                        Coach
                    </button>
                </div>
            </PageAnimation>
        </>
    );
}

export default Join;
