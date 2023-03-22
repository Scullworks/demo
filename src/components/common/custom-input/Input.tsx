import { ComponentProps } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> extends Omit<ComponentProps<'input'>, 'name'> {
    readonly name: Path<T>;
    readonly register: UseFormRegister<T>;
    readonly error: string | undefined;
}

function Input<T extends FieldValues>(props: InputProps<T>) {
    const { type = 'text', name, register, error, ...rest } = props;

    return (
        <>
            <input
                className={`input ${error && 'input-error'}`}
                type={type}
                id={name}
                {...register(name)}
                {...rest}
            />
            {error && (
                <label className="input-error__label" htmlFor={name}>
                    {error}
                </label>
            )}
        </>
    );
}

export default Input;
