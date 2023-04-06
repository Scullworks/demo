import { create } from 'zustand';
import { FeeProcessingOption } from '@/models';

export interface FeeProcessingState {
    readonly feeProcessingOption: FeeProcessingOption;
    readonly memberPrice: number;
    readonly guestPrice: number | null;
    readonly memberPriceToCharge: number;
    readonly guestPriceToCharge: number | null;
    readonly memberPayout: number;
    readonly guestPayout: number | null;
    readonly setFeeProcessingOption: (option: FeeProcessingOption) => void;
    readonly setMemberPrice: (memberPrice: number) => void;
    readonly setGuestPrice: (guestPrice: number) => void;
    readonly setMemberPriceToCharge: (memberPriceToCharge: number) => void;
    readonly setGuestPriceToCharge: (guestPriceToCharge: number) => void;
    readonly setMemberPayout: (memberPayout: number) => void;
    readonly setGuestPayout: (guestPayout: number) => void;
}

export const useFeeProcessingStore = create<FeeProcessingState>()(set => ({
    feeProcessingOption: 'Absorb Fees',
    memberPrice: 0,
    guestPrice: null,
    memberPriceToCharge: 0,
    guestPriceToCharge: null,
    memberPayout: 0,
    guestPayout: null,
    setFeeProcessingOption: feeProcessingOption => set(() => ({ feeProcessingOption })),
    setMemberPrice: memberPrice => set(() => ({ memberPrice })),
    setGuestPrice: guestPrice => set(() => ({ guestPrice })),
    setMemberPriceToCharge: memberPriceToCharge => set(() => ({ memberPriceToCharge })),
    setGuestPriceToCharge: guestPriceToCharge => set(() => ({ guestPriceToCharge })),
    setMemberPayout: memberPayout => set(() => ({ memberPayout })),
    setGuestPayout: guestPayout => set(() => ({ guestPayout }))
}));
