import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import MuiTextField from './MuiTextField';

type InputProps = Omit<ComponentProps<'input'>, 'name'>;

interface HookedTextFieldProps<T extends FieldValues> extends InputProps {
    readonly name: Path<T>;
    readonly control: Control<T>;
    readonly error: string | undefined;
}

function HookedTextField<T extends FieldValues>(props: HookedTextFieldProps<T>) {
    const { name, control, error } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <MuiTextField name={name} error={error} field={field} />}
        />
    );
}

export default HookedTextField;
