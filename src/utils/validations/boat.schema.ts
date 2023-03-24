import * as yup from 'yup';

export const boatSchema = yup.object().shape({
    boatSize: yup.string().required('Boat size is required'),
    boatMake: yup.string().required('Boat make is required'),
    boatName: yup.string().required('Boat name is required')
});
