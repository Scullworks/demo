import { useMemo, useState } from 'react';
import { Service } from './store';

export function useSelectedServices() {
    const [scullingSelected, setScullingSelected] = useState(false);
    const [ergSelected, setErgSelected] = useState(false);
    const [coachingSelected, setCoachingSelected] = useState(false);
    const [sweepRowSelected, setSweepRowSelected] = useState(false);
    const [eightSweepSelected, setEightSweepSelected] = useState(false);
    const [rentalSelected, setRentalSelected] = useState(false);
    const [services, setServices] = useState<Service[]>([]);

    const selectedServices = useMemo(() => services, [services]);

    function onScullingSelect() {
        setScullingSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('Sculling')
                ? prevState.filter(existing => existing !== 'Sculling')
                : [...prevState, 'Sculling']
        );
    }

    function onErgSelect() {
        setErgSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('ERG Workout')
                ? prevState.filter(existing => existing !== 'ERG Workout')
                : [...prevState, 'ERG Workout']
        );
    }

    function onCoachingSelect() {
        setCoachingSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('Private Coaching')
                ? prevState.filter(existing => existing !== 'Private Coaching')
                : [...prevState, 'Private Coaching']
        );
    }

    function onSweepRowSelect() {
        setSweepRowSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('Sweep Rowing')
                ? prevState.filter(existing => existing !== 'Sweep Rowing')
                : [...prevState, 'Sweep Rowing']
        );
    }

    function onEightSweepSelect() {
        setEightSweepSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('8x8 Sweep')
                ? prevState.filter(existing => existing !== '8x8 Sweep')
                : [...prevState, '8x8 Sweep']
        );
    }

    function onRentalSelect() {
        setRentalSelected(prevState => !prevState);
        setServices(prevState =>
            prevState.includes('Gear Rental')
                ? prevState.filter(existing => existing !== 'Gear Rental')
                : [...prevState, 'Gear Rental']
        );
    }

    return {
        scullingSelected,
        ergSelected,
        coachingSelected,
        sweepRowSelected,
        eightSweepSelected,
        rentalSelected,
        selectedServices,
        onScullingSelect,
        onErgSelect,
        onCoachingSelect,
        onSweepRowSelect,
        onEightSweepSelect,
        onRentalSelect
    };
}
