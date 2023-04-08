import { InputAdornment, MenuItem } from '@mui/material';
import { FormEvent } from 'react';
import { Control, FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { Autocomplete, HookedDateField, HookedTextField, HookedTimeField } from '@/components';
import { SessionValues, useFeeProcessing } from '@/hooks/pages';
import { FeeProcessingOption, Option } from '@/models';

const feeProcessingOptions: Option<FeeProcessingOption>[] = [
    { id: '3da29a1e-1de9-46fb-891f-770776cbae37', value: 'Absorb Fees' },
    { id: '718382f4-8072-4ce0-a044-08183301c0ce', value: 'Split Fees' },
    { id: '8a910a98-6752-4f1a-a8f4-d130cd212df4', value: 'Pass On Fees' }
];

interface ClubService {
    readonly id: string;
    readonly value: string;
}

interface SessionFormProps {
    readonly clubServices: ClubService[] | undefined;
    readonly coaches: Option[] | null | undefined;
    readonly boats: Option[] | null | undefined;
    readonly control: Control<SessionValues>;
    readonly errors: FieldErrors<SessionValues>;
    readonly onSubmit: (event: FormEvent) => void;
    readonly register: UseFormRegister<SessionValues>;
    readonly clearErrors: UseFormClearErrors<SessionValues>;
}

function SessionForm(props: SessionFormProps) {
    const {
        // eslint-disable-next-line prettier/prettier
        clubServices,
        coaches,
        boats,
        control,
        errors,
        onSubmit,
        register,
        clearErrors
    } = props;

    const { payoutText, guestPayoutText } = useFeeProcessing();

    return (
        <form className="profile-session-form" onSubmit={onSubmit}>
            <h1>Session details</h1>
            <div className="profile-session-form__pricing">
                <div className="profile-session-form__prices">
                    <HookedTextField
                        name="sessionPrice"
                        placeholder="Price (Member) *"
                        type="number"
                        control={control}
                        error={errors.sessionPrice?.message}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    <HookedTextField
                        name="sessionGuestPrice"
                        placeholder="Price (Guest) **"
                        type="number"
                        control={control}
                        error={errors.sessionGuestPrice?.message}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </div>
                <HookedTextField
                    name="sessionFeeProcessing"
                    placeholder="Fee Processing"
                    control={control}
                    error={errors.sessionFeeProcessing?.message}
                    select
                >
                    {feeProcessingOptions.map(option => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.value}
                        </MenuItem>
                    ))}
                </HookedTextField>
            </div>
            <div className="profile-session-form__date-time">
                <HookedDateField
                    name="sessionDate"
                    label="Date"
                    control={control}
                    error={errors.sessionDate?.message}
                    isTodayOrGreater
                />
                <div className="profile-session-form__time">
                    <HookedTimeField
                        name="sessionStart"
                        label="Start Time"
                        control={control}
                        error={errors.sessionStart?.message}
                    />
                    <HookedTimeField
                        name="sessionEnd"
                        label="End Time"
                        control={control}
                        error={errors.sessionEnd?.message}
                    />
                </div>
            </div>
            <Autocomplete
                label="Session Type"
                name="sessionType"
                register={register}
                clearErrors={clearErrors}
                options={clubServices ?? ([] as Option[])}
                error={errors.sessionType?.message}
                freeSolo
            />
            <Autocomplete
                label="Session Coach"
                name="sessionCoach"
                register={register}
                clearErrors={clearErrors}
                options={coaches ?? ([] as Option[])}
                error={errors.sessionCoach?.message}
                freeSolo
            />
            <Autocomplete
                label="Session Boat"
                name="sessionBoat"
                register={register}
                clearErrors={clearErrors}
                options={boats ?? ([] as Option[])}
                error={errors.sessionBoat?.message}
                freeSolo
            />
            {payoutText && <p className="profile-session-form__payout-text">{payoutText}</p>}
            {guestPayoutText && (
                <p className="profile-session-form__guest-payout-text">{guestPayoutText}</p>
            )}
            <button className="profile-session-form-button button__static" type="submit">
                Create Session
            </button>
        </form>
    );
}

export default SessionForm;
