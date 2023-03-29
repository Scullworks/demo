import * as yup from 'yup';

export const athleteMembershipSchema = yup.object().shape({
    club: yup.string().required('Please provide your rowing club'),
    membershipType: yup.string().required('Please select one of the options'),
    positionPreference: yup.string().required('Please select one of the options')
});
