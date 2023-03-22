import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, Path } from 'react-hook-form';

interface MuiInputAdornmentProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly showPassword: boolean;
    readonly setShowPassword: Dispatch<SetStateAction<boolean>>;
}

function MuiInputAdornment<T extends FieldValues>(props: MuiInputAdornmentProps<T>) {
    const { name, showPassword, setShowPassword } = props;

    function onClick() {
        setShowPassword(prevState => !prevState);
    }

    return (
        <>
            {name === 'password' && (
                <InputAdornment position="end">
                    <IconButton onClick={onClick} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )}
        </>
    );
}

export default MuiInputAdornment;
