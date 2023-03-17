import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    TwitterAuthProvider,
    User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AccessTokenUser, UserType } from '@/hooks/store/useAuthStore';
import { EXISTING_EMAIL, USER_NOT_FOUND, WRONG_PASSWORD } from '@/utils/errors/firebase';
import { auth, database } from './setup';

type AuthProvider = GoogleAuthProvider | FacebookAuthProvider | TwitterAuthProvider;

export interface AuthResponse {
    readonly user: AccessTokenUser | null;
    readonly error: string | null;
}

async function createUserDoc(user: User, email: string, userType: UserType) {
    const userDoc = doc(database, 'users', user.uid);
    const data = { uid: user.uid, email, type: userType };
    await setDoc(userDoc, data);
}

// Email & Password Authentication

export async function registerWithEmailAndPassword(
    email: string,
    password: string,
    userType: UserType
): Promise<AuthResponse> {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        createUserDoc(user, email, userType);
        const accessTokenUser = user as AccessTokenUser;
        localStorage.setItem('token', accessTokenUser.accessToken);

        return {
            user: accessTokenUser,
            error: null
        };
    } catch (error) {
        console.error('Sign Up With Email and Password Error: ', error.message);

        if (error.message === EXISTING_EMAIL) {
            return {
                user: null,
                error: 'This email is already in use'
            };
        }

        return {
            user: null,
            error: error.message
        };
    }
}

export async function loginWithEmailAndPassword(email: string, password: string) {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const accessTokenUser = user as AccessTokenUser;
        localStorage.setItem('token', accessTokenUser.accessToken);

        return {
            user: accessTokenUser,
            error: null
        };
    } catch (error) {
        console.error('Sign In With Email and Password Error: ', error.message);

        if (error.message === USER_NOT_FOUND) {
            return {
                user: null,
                error: 'No registered account with this email'
            };
        }

        if (error.message === WRONG_PASSWORD) {
            return {
                user: null,
                error: 'Enter the correct password'
            };
        }

        return {
            user: null,
            error: error.message as string
        };
    }
}

// Auth Provider Authentication - Google, Facebook & Twitter

async function loginWithProvider(provider: AuthProvider, userType?: UserType) {
    try {
        const { user } = await signInWithPopup(auth, provider);
        const accessTokenUser = user as AccessTokenUser;
        localStorage.setItem('token', accessTokenUser.accessToken);

        if (userType) {
            const email = user.email as string;
            await createUserDoc(user, email, userType);
        }

        return {
            user: accessTokenUser,
            error: null
        };
    } catch (error) {
        console.error(error.message);

        return {
            user: null,
            error: error.message as string
        };
    }
}

export async function authWithGoogle(userType?: UserType): Promise<AuthResponse> {
    const provider = new GoogleAuthProvider();
    const { user, error } = await loginWithProvider(provider, userType);
    return { user, error };
}

export async function authWithFacebook(userType?: UserType): Promise<AuthResponse> {
    const provider = new FacebookAuthProvider();
    const { user, error } = await loginWithProvider(provider, userType);
    return { user, error };
}

export async function authWithTwitter(userType?: UserType): Promise<AuthResponse> {
    const provider = new TwitterAuthProvider();
    const { user, error } = await loginWithProvider(provider, userType);
    return { user, error };
}

export async function signOutUser() {
    await signOut(auth);
}
