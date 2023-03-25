import { PhotoCamera } from '@mui/icons-material';
import { Button } from '@mui/material';
import Image from 'next/image';
import { HookedTextField } from '@/components';
import { useProfileInfo } from './useProfileInfo';

function ProfileInfo() {
    const { imageUrl, onImageInputChange, onSubmit, control, errors } = useProfileInfo();

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
