import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute, ReactNode, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import MuiInputAdornment from './MuiInputAdornment';

interface MuiTextFieldProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
    readonly type?: HTMLInputTypeAttribute;
    readonly placeholder?: string;
    readonly select?: boolean;
    readonly children?: ReactNode;
}

function MuiTextField<T extends FieldValues>(props: MuiTextFieldProps<T>) {
    const {
        name,
        error,
        field: { onChange, value },
        type,
        placeholder,
        select,
        children
    } = props;

    const [textFieldType, setTextFieldType] = useState<HTMLInputTypeAttribute>('text');
    const [showPassword, setShowPassword] = useState(false);

    const label = placeholder ?? name.charAt(0).toUpperCase() + name.slice(1);
    const isError = typeof error === 'string';
    const isMultiLine = name === 'message';

    useEffect(() => {
        if (type === 'password' && showPassword) setTextFieldType('text');
        if (type === 'password' && !showPassword) setTextFieldType('password');
        if (type !== 'password') setTextFieldType(type ?? 'text');
    }, [type, showPassword, setTextFieldType]);

    return (
        <TextField
            variant="outlined"
            type={textFieldType}
            color="info"
            label={label}
            error={isError}
            helperText={error && error}
            multiline={isMultiLine}
            rows={isMultiLine ? 8 : undefined}
            value={value}
            onChange={onChange}
            select={select}
            InputProps={{
                endAdornment: (
                    <MuiInputAdornment
                        name={name}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                )
            }}
        >
            {children}
        </TextField>
    );
}

export default MuiTextField;
