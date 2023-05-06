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
import { forwardRef, ReactElement, Ref } from 'react';
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
}

function AlertDialog({ open }: AlertDialogProps) {
    const setUserType = useAuthStore(state => state.setUserType);

    const { setStorageUserType } = useLocalStorage();

    function onClick(userType: UserType) {
        setStorageUserType(userType);
        setUserType(userType);
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
