import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
    readonly profileImage: string | null | undefined;
    readonly name: string | null | undefined;
}

function Avatar(props: AvatarProps) {
    const { profileImage, name } = props;

    const initials = name?.split(' ');
    const displayName = initials
        ? initials[0]?.charAt(0) + initials[1]?.charAt(0)
        : name?.charAt(0);

    return (
        <>
            {profileImage ? (
                <MuiAvatar src={profileImage} alt={name ?? ''} sx={{ width: 100, height: 100 }} />
            ) : (
                <MuiAvatar sx={{ width: 100, height: 100, backgroundColor: 'rgb(0, 128, 128)' }}>
                    {displayName}
                </MuiAvatar>
            )}
        </>
    );
}

export default Avatar;
