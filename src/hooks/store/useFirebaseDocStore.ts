import { create } from 'zustand';
import { FirebaseCollection } from '@/models';

interface FirebaseDocState {
    readonly data: FirebaseCollection | null;
}

interface FirebaseDocActions {
    readonly setData: (data: FirebaseCollection) => void;
    readonly reset: () => void;
}

export const useFirebaseDocStore = create<FirebaseDocState & FirebaseDocActions>()(set => ({
    data: null,
    setData: data => set({ data }),
    reset: () => set({ data: null })
}));
