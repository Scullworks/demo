import Image from 'next/image';
import facebookLogo from '@/assets/logos/facebook.png';
import googleLogo from '@/assets/logos/google.png';
import twitterLogo from '@/assets/logos/twitter.png';
import { useAuthStore } from '@/hooks/store/useAuthStore';
import {
    AuthResponse,
    authWithFacebook,
    authWithGoogle,
    authWithTwitter
} from '@/services/firebase/auth';

function AuthProviders() {
    const setUser = useAuthStore(state => state.setUser);

    function userLogin(authResponse: AuthResponse) {
        const { user } = authResponse;

        if (user) setUser(user);
        // TODO: Display an alert with a message
    }

    async function onGoogleLoginClick() {
        const response = await authWithGoogle('athlete');
        userLogin(response);
    }

    async function onFacebookLoginClick() {
        const response = await authWithFacebook('athlete');
        userLogin(response);
    }

    async function onTwitterLoginClick() {
        const response = await authWithTwitter('athlete');
        userLogin(response);
    }

    return (
        <>
            <div className="auth-providers">
                <div className="auth-providers__separator" />
                <span>or continue with</span>
                <div className="auth-providers__separator" />
            </div>
            <div className="auth-providers__images">
                <Image
                    src={googleLogo}
                    alt="Google logo"
                    height={50}
                    onClick={onGoogleLoginClick}
                />
                <Image
                    src={facebookLogo}
                    alt="Facebook logo"
                    height={50}
                    onClick={onFacebookLoginClick}
                />
                <Image
                    src={twitterLogo}
                    alt="Twitter logo"
                    height={50}
                    onClick={onTwitterLoginClick}
                />
            </div>
        </>
    );
}

export default AuthProviders;
