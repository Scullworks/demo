import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { FieldValues, Path, UseFormClearErrors, UseFormRegister } from 'react-hook-form';

export interface AutocompleteOption {
    readonly id: string;
    readonly name: string;
}

interface AutocompleteProps<T extends FieldValues> extends Omit<ComponentProps<'input'>, 'name'> {
    readonly label: string;
    readonly name: Path<T>;
    readonly register: UseFormRegister<T>;
    readonly clearErrors: UseFormClearErrors<T>;
    readonly options: AutocompleteOption[];
    readonly error: string | undefined;
}

function Autocomplete<T extends FieldValues>(props: AutocompleteProps<T>) {
    const { label, name, register, clearErrors, options, error } = props;

    const isError = typeof error === 'string';

    return (
        <MuiAutocomplete
            disablePortal
            options={options.map(club => club.name)}
            onChange={() => clearErrors(name)}
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
