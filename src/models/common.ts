export interface Option<T = string> {
    readonly id: string;
    readonly value: T;
}

export interface OptionWithProfileImage<T = string> {
    readonly id: string;
    readonly value: T;
    readonly profileImageRef: string | null;
}
