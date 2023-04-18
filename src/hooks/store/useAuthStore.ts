import { User } from 'firebase/auth';
import { create } from 'zustand';
import { UserType } from '@/models';

interface AuthState {
    readonly user: User | null;
    readonly userType: UserType | null;
    readonly userLoggedOut: boolean;
    readonly setUser: (user: User | null) => void;
    readonly setUserType: (userType: UserType) => void;
    readonly setUserLoggedOut: (userLoggedOut: boolean) => void;
}

export const useAuthStore = create<AuthState>()(set => ({
    user: null,
    userType: null,
    userLoggedOut: false,
    setUser: user => set(() => ({ user })),
    setUserType: userType => set(() => ({ userType })),
    setUserLoggedOut: userLoggedOut => set(() => ({ userLoggedOut }))
}));
