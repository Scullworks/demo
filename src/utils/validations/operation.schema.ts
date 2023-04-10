import * as yup from 'yup';

export const operationSchema = yup.object().shape({
    openingTime: yup
        .date()
        .typeError('Must be a valid time format')
        .required('Opening time is required'),
    closingTime: yup
        .date()
        .typeError('Must be a valid time format')
        .required('Closing time is required'),
    cancellationPolicy: yup.string().required('Cancellation policy is required'),
    address: yup.string().required('Address is required'),
    phoneNumber: yup
        .number()
        .typeError('Phone number is required')
        .required('Phone number is required')
});
