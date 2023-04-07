import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ViewCallbackProperties } from 'react-calendar';
import { useSessionsQuery } from '@/hooks/queries';
import { useDateStore } from '@/hooks/store';
import { SessionCalendarProps } from './SessionCalendar';

export function useSessionCalendar({ club }: SessionCalendarProps) {
    const [shouldFetch, setShouldFetch] = useState(false);
    const [monthViewChanged, setMonthViewChanged] = useState(false);

    const setDate = useDateStore(state => state.setDate);
    const setActiveStartDate = useDateStore(state => state.setActiveStartDate);
    const setActiveEndDate = useDateStore(state => state.setActiveEndDate);

    const { sessions, refetch } = useSessionsQuery(club?.id, shouldFetch);

    const datesWithSessions = sessions?.map(session => {
        const timestamp = new Timestamp(session.date.seconds, session.date.nanoseconds);
        return dayjs(timestamp.toDate()).format('MM/DD/YYYY');
    });

    function onClickDay(date: Date) {
        setDate(date);
    }

    function userChangedMonthView({ activeStartDate }: ViewCallbackProperties) {
        const activeEndDate = dayjs(activeStartDate).endOf('month').toDate();
        setActiveStartDate(activeStartDate);
        setActiveEndDate(activeEndDate);
        setMonthViewChanged(true);
    }

    useEffect(() => {
        if (club) setShouldFetch(true);
    }, [club]);

    useEffect(() => {
        if (monthViewChanged) {
            refetch();
            setMonthViewChanged(false);
        }
    }, [monthViewChanged, refetch, setMonthViewChanged]);

    return {
        setDate,
        onClickDay,
        userChangedMonthView,
        datesWithSessions
    };
}
