import { User } from 'firebase/auth';
import { create } from 'zustand';

export interface AccessTokenUser extends User {
    readonly accessToken: string;
}

export type UserType = 'athlete' | 'club' | 'coach';

interface AuthState {
    readonly user: AccessTokenUser | null;
    readonly userType: UserType | null;
    readonly setUser: (user: AccessTokenUser | null) => void;
    readonly setUserType: (userType: UserType) => void;
}

export const useAuthStore = create<AuthState>()(set => ({
    user: null,
    userType: null,
    setUser: user => set(() => ({ user })),
    setUserType: userType => set(() => ({ userType }))
}));
