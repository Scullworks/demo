import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { ViewCallbackProperties } from 'react-calendar';
import { useSessionsQuery } from '@/hooks/queries';
import { useDateStore, useFirebaseDocStore } from '@/hooks/store';
import { FirebaseCollection } from '@/models';

export function useDashboard<T extends FirebaseCollection>() {
    const [monthViewChanged, setMonthViewChanged] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const activeStartDate = useDateStore(state => state.activeStartDate);
    const setDate = useDateStore(state => state.setDate);
    const setActiveStartDate = useDateStore(state => state.setActiveStartDate);
    const setActiveEndDate = useDateStore(state => state.setActiveEndDate);

    const data = useFirebaseDocStore(state => state.data) as T;
    const clubId = data && 'club' in data ? data.club.id : data?.id;
    const { sessions, refetch } = useSessionsQuery(clubId, shouldFetch);

    if (data && clubId && !shouldFetch) setShouldFetch(true);

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
        if (monthViewChanged) {
            refetch();
            setMonthViewChanged(false);
        }
    }, [monthViewChanged, refetch]);

    const firstDateWithSession = useMemo(
        () =>
            sessions?.find(session => {
                const month = dayjs(session.date.toDate()).get('month');
                const currentMonth = dayjs(activeStartDate).get('month');
                return month === currentMonth;
            }),
        [sessions, activeStartDate]
    );

    useEffect(() => {
        if (firstDateWithSession) setDate(firstDateWithSession.date.toDate());
        if (!firstDateWithSession) setDate(activeStartDate);
    }, [activeStartDate, firstDateWithSession, sessions, setDate]);

    return {
        sessions,
        setDate,
        onClickDay,
        userChangedMonthView,
        datesWithSessions
    };
}
