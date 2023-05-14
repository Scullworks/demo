import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore, useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import { updateFirebaseDoc } from '@/services/firebase';
import { profileSchema } from '@/utils/validations';

export interface ProfileValues {
    readonly name: string;
}

export function useProfileInfo() {
    const user = useAuthStore(state => state.user);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const name = useCommonOnboardingStore(state => state.name);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);
    const setName = useCommonOnboardingStore(state => state.setName);
    const setImageUrl = useCommonOnboardingStore(state => state.setImageUrl);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const nextStep = useStepperStore(state => state.nextStep);

    const { setStorageStartedOnboarding } = useLocalStorage();

    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<ProfileValues>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: name ?? ''
        }
    });

    function onImageInputChange(event: ChangeEvent<HTMLInputElement>) {
        const image = event.target.files && event.target.files[0];
        const fileReader = new FileReader();

        fileReader.addEventListener('load', () => {
            setImageUrl(fileReader.result as string);
        });

        if (image) fileReader.readAsDataURL(image);
    }

    function submitDetails() {
        return handleSubmit(async data => {
            setName(data.name);

            if (isValid) {
                const uid = user?.uid as string;
                await updateFirebaseDoc('users', uid, { startedOnboarding: true });
                router.push('details');
                nextStep();
            }
        });
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        setActiveStep(0);
        setStorageStartedOnboarding();
    }, [setActiveStep, setStorageStartedOnboarding]);

    if (triggerSubmit) {
        setTriggerSubmit(false);
        submitDetails()();
    }

    return {
        imageUrl,
        onImageInputChange,
        onSubmit,
        control,
        errors
    };
}
