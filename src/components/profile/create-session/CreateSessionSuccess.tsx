import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import createSessionImage from '@/assets/profile/create-session.svg';

interface CreateSessionSuccessProps {
    readonly setShowSuccess: Dispatch<SetStateAction<boolean>>;
}

function CreateSessionSuccess({ setShowSuccess }: CreateSessionSuccessProps) {
    return (
        <div className="profile-session__create-success">
            <Image src={createSessionImage} alt="Create session" />
            <h1>Session created successfully</h1>
            <p>Athletes and coaches can view the session details in their calendar</p>
            <button className="button__static" onClick={() => setShowSuccess(false)}>
                Add Session
            </button>
        </div>
    );
}

export default CreateSessionSuccess;
