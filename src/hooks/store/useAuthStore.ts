import { User } from 'firebase/auth';
import { create } from 'zustand';
import { UserType } from '@/models';

interface AuthState {
    readonly user: User | null;
    readonly userType: UserType | null;
    readonly isLoading: boolean;
    readonly setUser: (user: User | null) => void;
    readonly setUserType: (userType: UserType) => void;
    readonly setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(set => ({
    user: null,
    userType: null,
    isLoading: false,
    setUser: user => set(() => ({ user })),
    setUserType: userType => set(() => ({ userType })),
    setIsLoading: isLoading => ({ isLoading })
}));
