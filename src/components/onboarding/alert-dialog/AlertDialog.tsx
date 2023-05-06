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
import { useLocalStorage } from '@/hooks/common';
import { useAuthStore } from '@/hooks/store';
import { UserType } from '@/models';

interface TransitionProps extends MuiTransitionProps {
    children: ReactElement;
}

const Transition = forwardRef(function Transition(props: TransitionProps, ref: Ref<unknown>) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
    readonly open: boolean;
    readonly setOpen: Dispatch<SetStateAction<boolean>>;
}

function AlertDialog(props: AlertDialogProps) {
    const { open, setOpen } = props;

    const setUserType = useAuthStore(state => state.setUserType);

    const { setStorageUserType } = useLocalStorage();

    function onClick(userType: UserType) {
        setStorageUserType(userType);
        setUserType(userType);
        setOpen(false);
    }

    return (
        <Dialog open={open} TransitionComponent={Transition}>
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
