export type Service =
    | 'Sculling'
    | 'ERG Workout'
    | 'Private Coaching'
    | 'Sweep Rowing'
    | '8x8 Sweep'
    | 'Gear Rental';

export type BoatSize = '8+' | '4+' | '4-' | '4x' | '2+' | '2-' | '2x' | '1x';

export interface Boat {
    readonly size: BoatSize;
    readonly make: string;
    readonly name: string;
}
