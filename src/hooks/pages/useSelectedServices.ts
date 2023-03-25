import { useMemo, useState } from 'react';
import { Service } from '@/hooks/store';

export function useSelectedServices() {
    const [services, setServices] = useState<Service[]>([]);

    const selectedServices = useMemo(() => services, [services]);

    function selectSculling() {
        setServices(prevState =>
            prevState.includes('Sculling')
                ? prevState.filter(existing => existing !== 'Sculling')
                : [...prevState, 'Sculling']
        );
    }

    function selectErg() {
        setServices(prevState =>
            prevState.includes('ERG Workout')
                ? prevState.filter(existing => existing !== 'ERG Workout')
                : [...prevState, 'ERG Workout']
        );
    }

    function selectCoaching() {
        setServices(prevState =>
            prevState.includes('Private Coaching')
                ? prevState.filter(existing => existing !== 'Private Coaching')
                : [...prevState, 'Private Coaching']
        );
    }

    function selectSweepRow() {
        setServices(prevState =>
            prevState.includes('Sweep Rowing')
                ? prevState.filter(existing => existing !== 'Sweep Rowing')
                : [...prevState, 'Sweep Rowing']
        );
    }

    function selectEightSweep() {
        setServices(prevState =>
            prevState.includes('8x8 Sweep')
                ? prevState.filter(existing => existing !== '8x8 Sweep')
                : [...prevState, '8x8 Sweep']
        );
    }

    function selectRental() {
        setServices(prevState =>
            prevState.includes('Gear Rental')
                ? prevState.filter(existing => existing !== 'Gear Rental')
                : [...prevState, 'Gear Rental']
        );
    }

    return {
        selectedServices,
        setServices,
        selectSculling,
        selectErg,
        selectCoaching,
        selectSweepRow,
        selectEightSweep,
        selectRental
    };
}
