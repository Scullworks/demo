import { create } from 'zustand';

interface CommonOnboardingState {
    readonly imageUrl: string | null;
    readonly name: string | null;
    readonly email: string | null;
    readonly phoneNumber: string | null;
}

interface CommonOnboardingActions {
    readonly setImageUrl: (imageUrl: string) => void;
    readonly setName: (name: string) => void;
    readonly setEmail: (email: string) => void;
    readonly setPhoneNumber: (phoneNumber: string) => void;
    readonly reset: () => void;
}

const initialState: CommonOnboardingState = {
    imageUrl: null,
    name: null,
    email: null,
    phoneNumber: null
};

export const useCommonOnboardingStore = create<CommonOnboardingState & CommonOnboardingActions>()(
    set => ({
        ...initialState,
        setImageUrl: imageUrl => set(() => ({ imageUrl })),
        setName: name => set(() => ({ name })),
        setEmail: email => set(() => ({ email })),
        setPhoneNumber: phoneNumber => set(() => ({ phoneNumber })),
        reset: () => set(initialState)
    })
);
