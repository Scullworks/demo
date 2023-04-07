import dayjs from 'dayjs';
import { create } from 'zustand';

export interface DateState {
    readonly date: Date;
    readonly activeStartDate: Date;
    readonly activeEndDate: Date;
    readonly setDate: (date: Date) => void;
    readonly setActiveStartDate: (activeStartDate: Date) => void;
    readonly setActiveEndDate: (activeEndDate: Date) => void;
}

export const useDateStore = create<DateState>()(set => ({
    date: new Date(),
    activeStartDate: new Date(),
    activeEndDate: dayjs(new Date()).endOf('month').toDate(),
    setDate: date => set(() => ({ date })),
    setActiveStartDate: activeStartDate => set(() => ({ activeStartDate })),
    setActiveEndDate: activeEndDate => set(() => ({ activeEndDate }))
}));
