import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute, PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { useFeeProcessingStore } from '@/hooks/store';
import MuiInputAdornment from './MuiInputAdornment';

interface MuiTextFieldProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
    readonly type?: HTMLInputTypeAttribute;
    readonly placeholder?: string;
    readonly select?: boolean;
    readonly startAdornment?: ReactNode;
}

function MuiTextField<T extends FieldValues>(props: PropsWithChildren<MuiTextFieldProps<T>>) {
    const {
        name,
        error,
        field: { onChange, value },
        type,
        placeholder,
        select,
        children,
        startAdornment
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const setMemberPrice = useFeeProcessingStore(state => state.setMemberPrice);
    const setGuestPrice = useFeeProcessingStore(state => state.setGuestPrice);
    const setFeeProcessingOption = useFeeProcessingStore(state => state.setFeeProcessingOption);

    const label = placeholder ?? name.charAt(0).toUpperCase() + name.slice(1);
    const isError = typeof error === 'string';
    const isMultiLine = name === 'message';

    let textFieldType: HTMLInputTypeAttribute = 'text';

    if (type === 'password' && showPassword) textFieldType = 'text';
    if (type === 'password' && !showPassword) textFieldType = 'password';
    if (type !== 'password') textFieldType = type ?? 'text';

    useEffect(() => {
        if (name === 'sessionPrice') setMemberPrice(parseInt(value) + 0.3);
        if (name === 'sessionGuestPrice') setGuestPrice(parseInt(value) + 0.3);
        if (name === 'sessionFeeProcessing') setFeeProcessingOption(value);
    }, [name, setGuestPrice, setMemberPrice, setFeeProcessingOption, value]);

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
                startAdornment,
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
