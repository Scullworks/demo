export interface Option<T = string> {
    readonly id: string;
    readonly value: T;
}

export interface OptionWithProfileImage extends Option {
    readonly profileImageRef: string | null;
}

export interface OptionWIthStripe extends Option {
    readonly stripeId: string | null;
}
