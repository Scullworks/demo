import { ComponentProps } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import MuiDateField from './MuiDateField';

type InputProps = Omit<ComponentProps<'input'>, 'name' | 'value'>;

interface HookedDateFieldProps<T extends FieldValues> extends InputProps {
    readonly label: string;
    readonly name: Path<T>;
    readonly control: Control<T>;
    readonly error: string | undefined;
    readonly isTodayOrGreater?: boolean;
}

function HookedDateField<T extends FieldValues>(props: HookedDateFieldProps<T>) {
    const { name, control, error, label, isTodayOrGreater } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <MuiDateField
                    name={name}
                    error={error}
                    field={field}
                    label={label}
                    isTodayOrGreater={isTodayOrGreater}
                />
            )}
        />
    );
}

export default HookedDateField;
