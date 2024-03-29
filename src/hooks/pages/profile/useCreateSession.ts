import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { useNestedOptionsQuery } from '@/hooks/queries';
import { useFeeProcessingStore, useFirebaseDocStore } from '@/hooks/store';
import { FirebaseClub, OptionWithProfileImage, ProfileSession } from '@/models';
import { createDoc } from '@/services/firebase';
import { checkIsTodayOrGreater } from '@/utils/dates';
import { createSessionSchema } from '@/utils/validations';

export interface SessionValues {
    readonly sessionPrice: number;
    readonly sessionGuestPrice: number;
    readonly sessionFeeProcessing: 'Absorb Fees' | 'Split Fees' | 'Pass On Fees';
    readonly sessionType: string;
    readonly sessionCoach: string;
    readonly sessionDate: string;
    readonly sessionStart: string;
    readonly sessionEnd: string;
    readonly sessionBoat: string;
}

export function useCreateSession() {
    const [showSuccess, setShowSuccess] = useState(false);

    const memberPriceToCharge = useFeeProcessingStore(state => state.memberPriceToCharge);
    const guestPriceToCharge = useFeeProcessingStore(state => state.guestPriceToCharge);

    const data = useFirebaseDocStore(state => state.data);
    const club = data as FirebaseClub | null;
    const shouldFetch = club?.id ? true : false;

    const { options: coaches } = useNestedOptionsQuery(club?.id, 'coaches', shouldFetch);
    const { options: boats } = useNestedOptionsQuery(club?.id, 'boats', shouldFetch);

    const clubServices = club?.services.map(service => ({ id: uuid(), value: service }));

    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        register,
        clearErrors,
        reset: clearFields,
        formState: { errors, isValid }
    } = useForm<SessionValues>({
        resolver: yupResolver(createSessionSchema),
        defaultValues: {
            sessionPrice: '' as unknown as number,
            sessionGuestPrice: undefined,
            sessionFeeProcessing: 'Absorb Fees',
            sessionType: undefined,
            sessionCoach: undefined,
            sessionDate: undefined,
            sessionStart: undefined,
            sessionEnd: undefined,
            sessionBoat: undefined
        }
    });

    function submitDetails() {
        return handleSubmit(async data => {
            const {
                sessionFeeProcessing,
                sessionType,
                sessionCoach,
                sessionDate,
                sessionStart,
                sessionEnd,
                sessionBoat
            } = data;

            const selectedCoach = selectedOption(sessionCoach, coaches);
            const selectedBoat = selectedOption(sessionBoat, boats);
            const startTime = dayjs(sessionStart).format('h:mm A');
            const endTime = dayjs(sessionEnd).format('h:mm A');

            const sessionData: ProfileSession = {
                clubId: club?.id,
                price: memberPriceToCharge,
                guestPrice: guestPriceToCharge ?? null,
                feeProcessingOption: sessionFeeProcessing,
                type: sessionType,
                date: Timestamp.fromDate(dayjs(sessionDate).toDate()),
                start: dayjs(sessionStart).format('h:mm A'),
                end: dayjs(sessionEnd).format('h:mm A'),
                time: formatTimeString(startTime, endTime),
                coach: selectedCoach,
                boat: selectedBoat,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const { isError } = checkIsTodayOrGreater(sessionDate, true);

            if (isValid && club?.id && !isError) {
                const { success } = await createDoc(club.id, 'sessions', sessionData);

                if (success) {
                    setShowSuccess(true);
                    clearFields();
                    await queryClient.refetchQueries({ queryKey: ['club', 'sessions'] });
                }
            }
        });
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    return {
        clubServices,
        coaches,
        boats,
        control,
        errors,
        showSuccess,
        setShowSuccess,
        onSubmit,
        register,
        clearErrors
    };
}

function selectedOption(option: string, options: OptionWithProfileImage[] | null | undefined) {
    const selectedOption = options?.find(opt => opt.value === option) ?? null;

    let firebaseSessionOption = null;

    if (!selectedOption && !option) firebaseSessionOption = null;

    if (selectedOption) {
        firebaseSessionOption = {
            id: selectedOption.id,
            name: selectedOption.value,
            profileImageRef: selectedOption.profileImageRef
        };
    }

    if (!selectedOption && option) {
        firebaseSessionOption = {
            id: uuid(),
            name: option,
            profileImageRef: null
        };
    }

    return firebaseSessionOption;
}

function formatTimeString(startTime: string, endTime: string) {
    let timeString;

    if (startTime.split(' ')[1] === endTime.split(' ')[1]) {
        timeString = `${startTime.split(' ')[0]}-${endTime}`;
    } else {
        timeString = `${startTime}-${endTime}`;
    }

    return timeString;
}
