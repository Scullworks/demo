import * as yup from 'yup';

export const contactUsSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    message: yup.string().required('Looks like you forgot to row in your message!')
});
