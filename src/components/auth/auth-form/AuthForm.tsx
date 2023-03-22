import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertDialog, HookedTextField, Severity, SnackbarAlert } from '@/components';
import { useAuthStore, UserType } from '@/hooks/store/useAuthStore';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '@/services/firebase/auth';
import { authSchema } from '@/utils/validations';

export interface AuthFormValues {
    readonly email: string;
    readonly password: string;
}

export interface AuthFormProps {
    type: 'login' | 'register';
}

function AuthForm({ type }: AuthFormProps) {
    const [alert, setAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [severity, setSeverity] = useState<Severity>('error');

    const userType = useAuthStore(state => state.userType);
    const setUser = useAuthStore(state => state.setUser);

    const router = useRouter();

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
            setUser(user);
            setSeverity('success');
            setAlert('You have successfully logged in');
            setShowAlert(true);
            // TODO: Find user in Firestore's users collection, to figure out user type
            // TODO: Navigate to appropriate dashboard
        }

        if (error) {
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
            setUser(user);
            setSeverity('success');
            setAlert('Account created successfully');
            setShowAlert(true);
            router.push(`/onboarding/${userType}/profile`);
        }

        if (error) {
            setAlert(error);
            setShowAlert(true);
        }
    });

    useEffect(() => {
        if (type === 'register' && !userType) setShowDialog(true);
    }, [type, userType, router]);

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
            <AlertDialog openDialog={showDialog} setOpenDialog={setShowDialog} />
        </form>
    );
}

export default AuthForm;
