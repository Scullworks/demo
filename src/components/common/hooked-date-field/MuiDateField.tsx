import { DateField } from '@mui/x-date-pickers';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { checkIsTodayOrGreater } from '@/utils/dates';

interface MuiDateFieldProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
    readonly label: string;
    readonly isTodayOrGreater?: boolean;
}

function MuiDateField<T extends FieldValues>(props: MuiDateFieldProps<T>) {
    const {
        error,
        field: { onChange, value },
        label,
        isTodayOrGreater
    } = props;

    const { isError: isTodayOrGreaterError, errorMessage } = checkIsTodayOrGreater(
        value,
        isTodayOrGreater
    );

    const isError = isTodayOrGreaterError || error !== undefined;

    return (
        <DateField
            label={label}
            value={value}
            onChange={onChange}
            slotProps={{
                textField: {
                    color: 'info',
                    error: isError,
                    helperText: errorMessage ?? error,
                    onChange,
                    value
                }
            }}
        />
    );
}

export default MuiDateField;
