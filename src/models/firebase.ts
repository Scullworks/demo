import { FieldValue, Timestamp } from 'firebase/firestore';
import { FeeProcessingOption } from './profile';
import { UserType } from './user';

export type CollectionName = 'clubs' | 'athletes' | 'coaches';
export type NestedCollectionName = 'athletes' | 'coaches' | 'sessions' | 'boats';

interface Club {
    readonly id: string;
    readonly name: string;
}

interface Option {
    readonly id: string | undefined;
    readonly name: string | undefined;
}

interface OptionProfileImage {
    readonly id: string | undefined;
    readonly name: string | undefined;
    readonly profileImageRef: string | null;
}

export interface OnboardingDoc {
    readonly uid: string | undefined;
    readonly name: string | null;
    readonly email: string | undefined;
    readonly phoneNumber: number | null;
}

interface FirebaseStripe {
    readonly id: string | null;
    readonly connected: boolean;
}

export interface OnboardingClub extends OnboardingDoc {
    readonly address: string | null;
    readonly cancellationPolicy: string | null;
    readonly closingTime: string | null;
    readonly openingTime: string | null;
    readonly services: string[];
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
    readonly stripe: FirebaseStripe;
}

export interface OnboardingClubDoc extends OnboardingDoc {
    club: Club;
}

export interface OnboardingCoach extends OnboardingClubDoc {
    readonly membershipType: string;
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
}

export interface OnboardingAthlete extends OnboardingClubDoc {
    readonly dateOfBirth: string | null;
    readonly emergencyName: string | null;
    readonly emergencyNumber: number | null;
    readonly membershipType: string;
    readonly positionPreference: string;
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
}

export interface FirebaseUserDoc {
    readonly uid: string;
    readonly email: string;
    readonly type: UserType;
}

export interface SessionAttendee {
    readonly id: string;
    readonly name: string;
    readonly profileImageRef: string | null;
}

export interface ProfileSession {
    readonly price: number;
    readonly guestPrice: number | null;
    readonly feeProcessingOption: FeeProcessingOption;
    readonly type: string;
    readonly coach: OptionProfileImage | null;
    readonly date: Timestamp;
    readonly start: string;
    readonly end: string;
    readonly time: string;
    readonly boat: Option | null;
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
    readonly attendees: SessionAttendee[] | null;
}

export interface FirebaseSession extends ProfileSession {
    readonly id: string;
}

interface FirebaseProfile {
    readonly id: string;
    readonly profileImage: string | null;
    readonly profileImageRef: string | null;
}

export interface FirebaseBoat {
    readonly id: string;
    readonly name: string;
    readonly make: string;
    readonly size: string;
}

export type FirebaseClub = OnboardingClub & FirebaseProfile;
export type FirebaseCoach = OnboardingCoach & FirebaseProfile;
export type FirebaseAthlete = OnboardingAthlete & FirebaseProfile;

export type FirebaseCollection = FirebaseClub | FirebaseCoach | FirebaseAthlete;

export type GetDocDataResponse<T extends FirebaseCollection> = T;
