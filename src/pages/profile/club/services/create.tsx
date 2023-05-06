import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { FormEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField, PageTitle, ProfileLayout, SnackbarAlert } from '@/components';
import { useEnsureFirebaseDocQuery } from '@/hooks/queries/useEnsureFirebaseDocQuery';
import { FirebaseClub } from '@/models';
import { database } from '@/services/firebase';
import { profileSchema } from '@/utils/validations';

interface ServiceValues {
    readonly name: string;
}

function AddService() {
    const [showAlert, setShowAlert] = useState(false);
    const { data: club } = useEnsureFirebaseDocQuery<FirebaseClub>('clubs');
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset: clearFields,
        formState: { errors, isValid }
    } = useForm<ServiceValues>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
                if (isValid && club) {
                    try {
                        const docRef = doc(database, 'clubs', club.id);
                        await updateDoc(docRef, { services: arrayUnion(data.name) });
                        await queryClient.refetchQueries({ queryKey: ['clubs'] });
                        setShowAlert(true);
                        clearFields();
                    } catch (error) {
                        console.error('Add Service Error: ', error.message);
                    }
                }
            }),
        [clearFields, club, handleSubmit, queryClient, isValid]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    return (
        <>
            <PageTitle text="Add Service" />
            <ProfileLayout for="clubs">
                <h2 className="profile-services-heading">Services Available At Your Club</h2>
                <form className="profile-services-form" onSubmit={onSubmit}>
                    <HookedTextField
                        name="name"
                        placeholder="Name"
                        control={control}
                        error={errors.name?.message}
                    />
                    <button className="button__static" type="submit">
                        Add Service
                    </button>
                </form>

                <SnackbarAlert
                    text="Service was added successfully"
                    severity="success"
                    hideCloseButton
                    open={showAlert}
                    setOpen={setShowAlert}
                />
            </ProfileLayout>
        </>
    );
}

export default AddService;
