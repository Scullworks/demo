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
    sessionStart: yup.string().required('Session start is required'),
    sessionEnd: yup.string().required('Session end is required'),
    sessionBoat: yup.string()
});
