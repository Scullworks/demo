import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
    readonly profileImage: string | null | undefined;
    readonly name: string | null | undefined;
    readonly isProfileMenu?: boolean;
}

function Avatar(props: AvatarProps) {
    const { profileImage, name, isProfileMenu } = props;

    const initials = name?.split(' ');
    const displayName =
        initials && initials.length > 1
            ? initials[0].charAt(0) + initials[initials.length - 1].charAt(0)
            : name?.charAt(0);

    if (profileImage) {
        return <MuiAvatar src={profileImage} alt={name ?? ''} sx={{ width: 100, height: 100 }} />;
    }

    if (!profileImage && isProfileMenu) {
        return <MuiAvatar sx={{ width: 100, height: 100 }} />;
    }

    return (
        <MuiAvatar sx={{ width: 100, height: 100, backgroundColor: 'rgb(0, 128, 128)' }}>
            {displayName}
        </MuiAvatar>
    );
}

export default Avatar;
