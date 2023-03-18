import * as yup from 'yup';

export const authSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup.string().required('Password is required')
});
