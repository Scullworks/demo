import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@mui/material';
import { TransitionProps as MuiTransitionProps } from '@mui/material/transitions';
import { Dispatch, forwardRef, ReactElement, Ref, SetStateAction } from 'react';
import { useAuthStore, UserType } from '@/hooks/store';

interface TransitionProps extends MuiTransitionProps {
    children: ReactElement;
}

const Transition = forwardRef(function Transition(props: TransitionProps, ref: Ref<unknown>) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
    readonly openDialog: boolean;
    readonly setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

function AlertDialog(props: AlertDialogProps) {
    const { openDialog, setOpenDialog } = props;

    const setUserType = useAuthStore(state => state.setUserType);

    function onClick(userType: UserType) {
        localStorage.setItem('user-type', userType);
        setUserType(userType);
        setOpenDialog(false);
    }

    return (
        <Dialog open={openDialog} TransitionComponent={Transition}>
            <DialogTitle>Please select your user type</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    We need this to provide you with the appropriate onboarding.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClick('athlete')}>Athlete</Button>
                <Button onClick={() => onClick('club')}>Club</Button>
                <Button onClick={() => onClick('coach')}>Coach</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;
