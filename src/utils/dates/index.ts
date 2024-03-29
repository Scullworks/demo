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
    const errorMessage = isError ? 'Date is in the past' : null;

    return {
        isError,
        errorMessage
    };
}
