import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { Boat, Service } from '@/models';

interface ClubOnboardingState {
    readonly openingTime: Dayjs | null;
    readonly closingTime: Dayjs | null;
    readonly cancellationPolicy: string | null;
    readonly address: string | null;
    readonly services: Service[];
    readonly boats: Boat[];
}

interface ClubOnboardingActions {
    readonly setOpeningTime: (openingTime: Dayjs) => void;
    readonly setClosingTime: (closingTime: Dayjs) => void;
    readonly setCancellationPolicy: (cancellationPolicy: string) => void;
    readonly setAddress: (address: string) => void;
    readonly updateServices: (services: Service[]) => void;
    readonly addBoat: (boat: Boat) => void;
    readonly reset: () => void;
}

const initialState: ClubOnboardingState = {
    openingTime: null,
    closingTime: null,
    cancellationPolicy: null,
    address: null,
    services: [],
    boats: []
};

export const useClubOnboardingStore = create<ClubOnboardingState & ClubOnboardingActions>()(
    set => ({
        ...initialState,
        setOpeningTime: openingTime => set(() => ({ openingTime })),
        setClosingTime: closingTime => set(() => ({ closingTime })),
        setCancellationPolicy: cancellationPolicy => set(() => ({ cancellationPolicy })),
        setAddress: address => set(() => ({ address })),
        updateServices: services => set(() => ({ services })),
        addBoat: boat => set(state => ({ boats: [...state.boats, boat] })),
        reset: () => set(initialState)
    })
);
