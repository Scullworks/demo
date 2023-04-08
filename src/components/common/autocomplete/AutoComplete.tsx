import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { FieldValues, Path, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { Option } from '@/models';

interface AutocompleteProps<T extends FieldValues> extends Omit<ComponentProps<'input'>, 'name'> {
    readonly label: string;
    readonly name: Path<T>;
    readonly defaultValue?: string;
    readonly register: UseFormRegister<T>;
    readonly clearErrors: UseFormClearErrors<T>;
    readonly options: Option[];
    readonly error: string | undefined;
    readonly freeSolo?: boolean;
}

function Autocomplete<T extends FieldValues>(props: AutocompleteProps<T>) {
    const {
        label,
        name,
        defaultValue,
        register,
        clearErrors,
        options,
        error,
        freeSolo = false
    } = props;

    const isError = typeof error === 'string';

    return (
        <MuiAutocomplete
            defaultValue={defaultValue}
            options={options.map(option => option.value)}
            onChange={() => clearErrors(name)}
            freeSolo={freeSolo}
            renderInput={params => (
                <TextField
                    label={label}
                    color="info"
                    error={isError}
                    helperText={error}
                    {...register(name)}
                    {...params}
                />
            )}
        />
    );
}

export default Autocomplete;
