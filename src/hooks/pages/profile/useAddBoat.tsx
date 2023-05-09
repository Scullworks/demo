import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { FormEvent, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoatValues } from '@/hooks/pages/useBoats';
import { useFirebaseDocStore } from '@/hooks/store';
import { Boat, BoatSize } from '@/models';
import { createDoc } from '@/services/firebase';
import { boatSchema } from '@/utils/validations';

export function useAddBoat() {
    const [showAlert, setShowAlert] = useState(false);
    const club = useFirebaseDocStore(state => state.data);

    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset: clearFields,
        formState: { errors, isValid }
    } = useForm<BoatValues>({
        resolver: yupResolver(boatSchema),
        defaultValues: {
            boatSize: '',
            boatMake: '',
            boatName: ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
                const { boatSize, boatMake, boatName } = data;

                const userAddedBoat = boatSize !== null && boatMake !== null && boatName !== null;

                const boat: Boat = {
                    size: boatSize as BoatSize,
                    make: boatMake,
                    name: boatName
                };

                if (club && isValid && userAddedBoat) {
                    const { success } = await createDoc(club.id, 'boats', boat);

                    if (success) {
                        await queryClient.refetchQueries({
                            queryKey: ['club', 'nested', 'boats']
                        });
                        setShowAlert(true);
                        clearFields();
                    }
                }
            }),
        [handleSubmit, club, isValid, queryClient, clearFields]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    return {
        showAlert,
        setShowAlert,
        control,
        errors,
        onSubmit
    };
}
