import Calendar, { ViewCallbackProperties } from 'react-calendar';
import { useDateStore } from '@/hooks/store';
import TileContent from './TileContent';

export interface SessionCalendarProps {
    readonly setDate: (date: Date) => void;
    readonly onClickDay: (date: Date) => void;
    readonly userChangedMonthView: ({ activeStartDate }: ViewCallbackProperties) => void;
    readonly datesWithSessions: string[] | undefined;
}

function SessionCalendar(props: SessionCalendarProps) {
    const { setDate, onClickDay, userChangedMonthView, datesWithSessions } = props;

    const date = useDateStore(state => state.date);
    const minDate = new Date(2023, 3, 1);

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
