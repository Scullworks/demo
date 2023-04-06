import dayjs from 'dayjs';

/**
 *  Checks whether the date entered is today or a future date.
 * @param dateString date string.
 * @param isTodayOrGreater should be true if we expected the date to be today or greater.
 * @returns an object with an error boolean and a error message if any.
 */
export function checkIsTodayOrGreater(dateString: string, isTodayOrGreater: boolean | undefined) {
    if (!isTodayOrGreater) {
        return {
            isError: false,
            errorMessage: null
        };
    }

    const enteredDate = new Date(dateString);
    const enteredDateUnix = dayjs(dateString).unix();
    const yesterdayUnix = dayjs(new Date()).subtract(1, 'day').unix();
    const isError = enteredDate instanceof Date && enteredDateUnix < yesterdayUnix;
    const errorMessage = isError ? 'Session date must be in the future' : null;

    return {
        isError,
        errorMessage
    };
}

/**
 * Formats time from a date string
 * @param dateString date string
 * @returns formatted time (e.g. '10:30 AM')
 */
export function formatTime(dateString: string) {
    const splitDate = dateString.split(' ');
    const time = splitDate[4];
    const splitTime = time.split(':');
    const hour = parseInt(splitTime[0]);
    const minute = splitTime[1];
    const isPmHour = hour > 12;
    const formattedHour = isPmHour ? hour - 12 : hour;
    const formattedTime = `${formattedHour}:${minute} ${isPmHour ? 'PM' : 'AM'}`;
    return formattedTime;
}
