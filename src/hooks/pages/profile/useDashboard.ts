import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ViewCallbackProperties } from 'react-calendar';
import { useFirebaseDocQuery, useSessionsQuery } from '@/hooks/queries';
import { useDateStore } from '@/hooks/store';
import { CollectionName, FirebaseCollection } from '@/models';

export function useDashboard<T extends FirebaseCollection>(collectionName: CollectionName) {
    const [shouldFetch, setShouldFetch] = useState(false);
    const [monthViewChanged, setMonthViewChanged] = useState(false);

    const activeStartDate = useDateStore(state => state.activeStartDate);
    const setDate = useDateStore(state => state.setDate);
    const setActiveStartDate = useDateStore(state => state.setActiveStartDate);
    const setActiveEndDate = useDateStore(state => state.setActiveEndDate);

    const { data } = useFirebaseDocQuery<T>(collectionName);
    const clubId = data && 'club' in data ? data.club.id : data?.id;
    const { sessions, refetch } = useSessionsQuery(clubId, shouldFetch);

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
        if (data) setShouldFetch(true);
    }, [data]);

    useEffect(() => {
        if (monthViewChanged) {
            refetch();
            setMonthViewChanged(false);
        }
    }, [monthViewChanged, refetch, setMonthViewChanged]);

    useEffect(() => {
        const firstDateWithSession = sessions?.find(session => {
            const month = dayjs(session.date.toDate()).get('month');
            const currentMonth = dayjs(activeStartDate).get('month');
            return month === currentMonth;
        });

        if (firstDateWithSession) setDate(firstDateWithSession.date.toDate());
    }, [sessions, activeStartDate, setDate]);

    return {
        sessions,
        setDate,
        onClickDay,
        userChangedMonthView,
        datesWithSessions
    };
}
