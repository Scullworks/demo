import { TextField } from '@mui/material';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

interface TextFieldRenderProps<T extends FieldValues> {
    readonly name: Path<T>;
    readonly error: string | undefined;
    readonly field: ControllerRenderProps<T, Path<T>>;
}

function MuiTextField<T extends FieldValues>(props: TextFieldRenderProps<T>) {
    const {
        name,
        error,
        field: { onChange, value }
    } = props;

    const isError = typeof error === 'string';
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    const isMultiLine = name === 'message';

    return (
        <TextField
            variant="outlined"
            color="info"
            label={label}
            error={isError}
            helperText={error && error}
            multiline={isMultiLine}
            rows={isMultiLine ? 8 : undefined}
            value={value}
            onChange={onChange}
        />
    );
}

export default MuiTextField;
