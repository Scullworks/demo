import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import { profileSchema } from '@/utils/validations';

interface ProfileValues {
    readonly name: string;
}

export function useProfileInfo() {
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
    const name = useCommonOnboardingStore(state => state.name);
    const imageUrl = useCommonOnboardingStore(state => state.imageUrl);
    const setName = useCommonOnboardingStore(state => state.setName);
    const setImageUrl = useCommonOnboardingStore(state => state.setImageUrl);
    const setActiveStep = useStepperStore(state => state.setActiveStep);
    const setTriggerSubmit = useStepperStore(state => state.setTriggerSubmit);
    const nextStep = useStepperStore(state => state.nextStep);

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

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                setName(data.name);

                if (isValid) {
                    router.push('details');
                    nextStep();
                }
            }),
        [handleSubmit, isValid, nextStep, router, setName]
    );

    function onImageInputChange(event: ChangeEvent<HTMLInputElement>) {
        const image = event.target.files && event.target.files[0];
        const fileReader = new FileReader();

        fileReader.addEventListener('load', () => {
            setImageUrl(fileReader.result as string);
        });

        if (image) fileReader.readAsDataURL(image);
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault();
        submitDetails()();
    }

    useEffect(() => {
        if (triggerSubmit) {
            submitDetails()();
            setTriggerSubmit(false);
        }
    }, [triggerSubmit, setTriggerSubmit, submitDetails]);

    useEffect(() => {
        setActiveStep(0);
    }, [setActiveStep]);

    return {
        imageUrl,
        onImageInputChange,
        onSubmit,
        control,
        errors
    };
}
