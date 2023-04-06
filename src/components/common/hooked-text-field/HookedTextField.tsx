import { ComponentProps, HTMLInputTypeAttribute, ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import MuiTextField from './MuiTextField';

type InputProps = Omit<ComponentProps<'input'>, 'name'>;

interface HookedTextFieldProps<T extends FieldValues> extends InputProps {
    readonly name: Path<T>;
    readonly control: Control<T>;
    readonly error: string | undefined;
    readonly type?: HTMLInputTypeAttribute;
    readonly placeholder?: string;
    readonly select?: boolean;
    readonly startAdornment?: ReactNode;
    readonly children?: ReactNode;
}

function HookedTextField<T extends FieldValues>(props: HookedTextFieldProps<T>) {
    const { name, control, error, type, placeholder, select, startAdornment, children } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MuiTextField
                    name={name}
                    error={error}
                    field={field}
                    type={type}
                    placeholder={placeholder}
                    select={select}
                    startAdornment={startAdornment}
                >
                    {children}
                </MuiTextField>
            )}
        />
    );
}

export default HookedTextField;
