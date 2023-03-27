export interface Step {
    readonly id: number;
    readonly label: string;
}

export const athleteSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Membership' }
];

export const clubSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Services' },
    { id: 4, label: 'Boats' }
];

export const coachSteps: Step[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Details' }
];
