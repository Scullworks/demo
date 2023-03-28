import * as yup from 'yup';

export const athleteDetailsSchema = yup.object().shape({
    phoneNumber: yup
        .number()
        .typeError('Phone number is required')
        .required('Phone number is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    emergencyName: yup.string().required('Emergency contact name is required'),
    emergencyNumber: yup
        .number()
        .typeError('Emergency contact number is required')
        .required('Emergency contact number is required')
});
