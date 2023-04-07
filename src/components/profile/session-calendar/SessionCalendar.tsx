import Calendar from 'react-calendar';
import { useDateStore } from '@/hooks/store';
import { FirebaseClubWithImage } from '@/models';
import TileContent from './TileContent';
import { useSessionCalendar } from './useSessionCalendar';

export interface SessionCalendarProps {
    readonly club: FirebaseClubWithImage | undefined;
}

function SessionCalendar({ club }: SessionCalendarProps) {
    const date = useDateStore(state => state.date);
    const minDate = new Date(2023, 3, 1);

    const { setDate, onClickDay, userChangedMonthView, datesWithSessions } = useSessionCalendar({
        club
    });

    return (
        <Calendar
            value={date}
            defaultValue={date}
            onChange={setDate}
            onClickDay={onClickDay}
            onActiveStartDateChange={userChangedMonthView}
            minDate={minDate}
            tileContent={({ date }) => (
                <TileContent date={date} datesWithSessions={datesWithSessions} />
            )}
        />
    );
}

export default SessionCalendar;
