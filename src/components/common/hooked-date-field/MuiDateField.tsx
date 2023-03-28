import { DateField } from '@mui/x-date-pickers';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface MuiDateFieldProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
    readonly label: string;
}

function MuiDateField<T extends FieldValues>(props: MuiDateFieldProps<T>) {
    const {
        error,
        field: { onChange, value },
        label
    } = props;

    const isError = typeof error === 'string';

    return (
        <DateField
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
                textField: {
                    color: 'info',
                    error: isError,
                    helperText: error,
                    onChange,
                    value
                }
            }}
        />
    );
}

export default MuiDateField;
