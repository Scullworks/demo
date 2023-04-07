import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { useClubDataQuery, useNestedOptionsQuery } from '@/hooks/queries';
import { useFeeProcessingStore } from '@/hooks/store';
import { Option, ProfileSession } from '@/models';
import { createSession } from '@/services/firebase';
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
    const [shouldFetch, setShouldFetch] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const memberPriceToCharge = useFeeProcessingStore(state => state.memberPriceToCharge);
    const guestPriceToCharge = useFeeProcessingStore(state => state.guestPriceToCharge);

    const { club } = useClubDataQuery();
    const { options: coaches } = useNestedOptionsQuery(club?.id, 'coaches', shouldFetch);
    const { options: boats } = useNestedOptionsQuery(club?.id, 'boats', shouldFetch);

    const clubServices = club?.services.map(service => ({ id: uuid(), value: service }));

    const {
        control,
        handleSubmit,
        register,
        clearErrors,
        reset,
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

    const submitDetails = useCallback(
        () =>
            handleSubmit(async data => {
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

                const sessionData: ProfileSession = {
                    price: memberPriceToCharge,
                    guestPrice: guestPriceToCharge ?? null,
                    feeProcessingOption: sessionFeeProcessing,
                    type: sessionType,
                    date: Timestamp.fromDate(dayjs(sessionDate).toDate()),
                    start: dayjs(sessionStart).format('h:mm A'),
                    end: dayjs(sessionEnd).format('h:mm A'),
                    coach: selectedCoach,
                    boat: selectedBoat
                };

                const { isError } = checkIsTodayOrGreater(sessionDate, true);

                if (isValid && club?.id && !isError) {
                    const { success } = await createSession(club.id, sessionData);

                    if (success) {
                        setShowSuccess(true);
                        reset();
                    }
                }
            }),
        [
            boats,
            club?.id,
            coaches,
            guestPriceToCharge,
            handleSubmit,
            isValid,
            memberPriceToCharge,
            reset
        ]
    );

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        if (club?.id) setShouldFetch(true);
    }, [club?.id]);

    return {
        club,
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

function selectedOption(option: string, options: Option<string>[] | null | undefined) {
    const selectedOption = options?.find(opt => opt.value === option) ?? null;

    let firebaseSessionOption = null;

    if (!selectedOption && !option) firebaseSessionOption = null;

    if (selectedOption) {
        firebaseSessionOption = {
            id: selectedOption.id,
            name: selectedOption.value
        };
    }

    if (!selectedOption && option) {
        firebaseSessionOption = {
            id: uuid(),
            name: option
        };
    }

    return firebaseSessionOption;
}
