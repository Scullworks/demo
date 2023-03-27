import * as yup from 'yup';

export const coachDetailsSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .typeError('Phone number is required')
        .required('Phone number is required'),
    club: yup.string().required('Please provide your rowing club'),
    membership: yup.string().required('Please select one of the options')
});
