import * as yup from 'yup';

export const athleteDetailsSchema = yup.object().shape({
    phoneNumber: yup.string().required('Phone number is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    emergencyName: yup.string().required('Emergency contact name is required'),
    emergencyNumber: yup.string().required('Emergency contact number is required')
});
