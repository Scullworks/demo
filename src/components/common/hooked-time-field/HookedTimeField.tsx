import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import MuiTimeField from './MuiTimeField';

type InputProps = Omit<ComponentProps<'input'>, 'name'>;

interface HookedTimeFieldProps<T extends FieldValues> extends InputProps {
    readonly name: Path<T>;
    readonly control: Control<T>;
    readonly error: string | undefined;
    readonly label: string;
}

function HookedTimeField<T extends FieldValues>(props: HookedTimeFieldProps<T>) {
    const { name, control, error, label } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MuiTimeField name={name} error={error} field={field} label={label} />
            )}
        />
    );
}

export default HookedTimeField;
