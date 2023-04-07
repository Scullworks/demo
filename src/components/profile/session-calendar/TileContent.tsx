import dayjs from 'dayjs';

interface TileContentProps {
    readonly date: Date;
    readonly datesWithSessions: string[] | undefined;
}

function TileContent(props: TileContentProps) {
    const { date, datesWithSessions } = props;

    const formattedDate = dayjs(date).format('MM/DD/YYYY');

    if (datesWithSessions?.includes(formattedDate)) {
        return <span className="session-calendar__date-with-session" />;
    }

    return <></>;
}

export default TileContent;
