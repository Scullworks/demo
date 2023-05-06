import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertDialog, HookedTextField, Severity, SnackbarAlert } from '@/components';
import { useLocalStorage } from '@/hooks/common';
import { UserType } from '@/models';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '@/services/firebase/auth';
import { authSchema } from '@/utils/validations';

export interface AuthFormValues {
    readonly email: string;
    readonly password: string;
}

export interface AuthFormProps {
    as: 'login' | 'register';
}

function AuthForm({ as: type }: AuthFormProps) {
    const { userType } = useLocalStorage();

    const [alert, setAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [severity, setSeverity] = useState<Severity>('error');
    const [openDialog, setOpenDialog] = useState(type === 'register' && !userType);

    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthFormValues>({
        resolver: yupResolver(authSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onLoginSubmit = handleSubmit(async data => {
        const { email, password } = data;
        const { user, error } = await loginWithEmailAndPassword(email, password);

        if (user) {
            await queryClient.resetQueries();
        }

        if (error) {
            setSeverity('error');
            setAlert(error);
            setShowAlert(true);
        }
    });

    const onRegisterSubmit = handleSubmit(async data => {
        const { email, password } = data;
        const { user, error } = await registerWithEmailAndPassword(
            email,
            password,
            userType as UserType
        );

        if (user) {
            await queryClient.resetQueries();
        }

        if (error) {
            setSeverity('error');
            setAlert(error);
            setShowAlert(true);
        }
    });

    const onSubmit = type === 'login' ? onLoginSubmit : onRegisterSubmit;
    const buttonText = type === 'login' ? 'Login' : 'Register';

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <HookedTextField name="email" control={control} error={errors?.email?.message} />
            <HookedTextField
                name="password"
                type="password"
                control={control}
                error={errors.password?.message}
            />
            <button className="auth-form__submit button" type="submit">
                {buttonText}
            </button>
            <SnackbarAlert
                text={alert}
                severity={severity}
                open={showAlert}
                setOpen={setShowAlert}
            />
            <AlertDialog open={openDialog} setOpen={setOpenDialog} />
        </form>
    );
}

export default AuthForm;
