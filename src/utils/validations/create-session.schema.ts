import * as yup from 'yup';

export const createSessionSchema = yup.object().shape({
    sessionPrice: yup
        .number()
        .typeError('Session price is required')
        .required('Session price is required'),
    sessionGuestPrice: yup.number().typeError('Session price is required'),
    sessionFeeProcessing: yup
        .string()
        .oneOf(['Absorb Fees', 'Split Fees', 'Pass On Fees'])
        .required('Fee Processing is required'),
    sessionType: yup.string().required('Session type is required'),
    sessionCoach: yup.string(),
    sessionDate: yup.string().required('Session date is required'),
    sessionStart: yup
        .date()
        .typeError('Must be a valid time format')
        .required('Session start is required'),
    sessionEnd: yup
        .date()
        .typeError('Must be a valid time format')
        .required('Session end is required'),
    sessionBoat: yup.string()
});
