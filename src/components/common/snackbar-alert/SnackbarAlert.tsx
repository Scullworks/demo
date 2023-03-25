import { Alert as MuiAlert, AlertProps, Slide, SlideProps, Snackbar } from '@mui/material';
import {
    ComponentType,
    Dispatch,
    forwardRef,
    SetStateAction,
    SyntheticEvent,
    useEffect,
    useState
} from 'react';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type Severity = 'success' | 'error';

interface SnackbarAlertProps {
    readonly text: string | null;
    readonly severity: Severity;
    readonly hideCloseButton?: boolean;
    readonly open: boolean;
    readonly setOpen: Dispatch<SetStateAction<boolean>>;
}

function SnackbarAlert(props: SnackbarAlertProps) {
    const { text, severity, hideCloseButton, open, setOpen } = props;
    const [transition, setTransition] = useState<ComponentType<TransitionProps> | undefined>(
        undefined
    );

    function onClose(_event?: SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    useEffect(() => {
        setTransition(() => TransitionUp);
    }, [open]);

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={hideCloseButton ? 2500 : 5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={onClose}
                TransitionComponent={transition}
            >
                <Alert
                    onClose={hideCloseButton ? undefined : onClose}
                    severity={severity}
                    color={severity}
                >
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarAlert;
