import { yupResolver } from '@hookform/resolvers/yup';
import { PhotoCamera } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField } from '@/components';
import { useAuthStore, useCommonOnboardingStore, useStepperStore } from '@/hooks/store';
import { profileSchema } from '@/utils/validations';

export interface ProfileValues {
    readonly name: string;
}

function ProfileInfo() {
    const userType = useAuthStore(state => state.userType);
    const triggerSubmit = useStepperStore(state => state.triggerSubmit);
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
        formState: { errors }
    } = useForm<ProfileValues>({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: ''
        }
    });

    const submitDetails = useCallback(
        () =>
            handleSubmit(data => {
                setName(data.name);
                const isError = errors.name?.message !== undefined;

                if (!isError) {
                    router.push(`/onboarding/${userType}/details`);
                    nextStep();
                }
            }),
        [handleSubmit, router, setName, userType, nextStep, errors.name?.message]
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

    return (
        <div className="profile-info">
            {imageUrl ? (
                <Image
                    className="profile-info__image"
                    src={imageUrl}
                    alt="Profile Image"
                    width={150}
                    height={150}
                />
            ) : (
                <Button variant="contained" component="label">
                    <input hidden accept="image/*" type="file" onChange={onImageInputChange} />
                    <PhotoCamera />
                </Button>
            )}

            <form className="profile-info__form" onSubmit={onSubmit}>
                <HookedTextField name="name" control={control} error={errors.name?.message} />
            </form>
        </div>
    );
}

export default ProfileInfo;
