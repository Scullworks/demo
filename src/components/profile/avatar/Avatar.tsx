import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
    readonly profileImage: string | null;
    readonly name: string | null;
}

function Avatar(props: AvatarProps) {
    const { profileImage, name } = props;

    return (
        <>
            {profileImage ? (
                <MuiAvatar src={profileImage} alt={name ?? ''} sx={{ width: 100, height: 100 }} />
            ) : (
                <MuiAvatar sx={{ width: 100, height: 100 }}>T</MuiAvatar>
            )}
        </>
    );
}

export default Avatar;
