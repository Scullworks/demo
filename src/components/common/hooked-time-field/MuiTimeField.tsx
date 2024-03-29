import { TimeField } from '@mui/x-date-pickers/TimeField';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface MuiTimeFieldProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
    readonly label: string;
}

function MuiTimeField<T extends FieldValues>(props: MuiTimeFieldProps<T>) {
    const {
        error,
        field: { onChange, value },
        label
    } = props;

    const isError = typeof error === 'string';

    return (
        <TimeField
            variant="outlined"
            color="info"
            label={label}
            helperText={error && error}
            value={value}
            onChange={onChange}
            slotProps={{
                textField: {
                    error: isError
                }
            }}
        />
    );
}

export default MuiTimeField;
