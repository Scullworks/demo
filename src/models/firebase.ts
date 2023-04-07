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

export interface FirebaseDoc {
    readonly uid: string | undefined;
    readonly name: string | null;
    readonly email: string | undefined;
    readonly phoneNumber: number | null;
}

interface FirebaseStripe {
    readonly id: string | null;
    readonly connected: boolean;
}

export interface FirebaseClub extends FirebaseDoc {
    readonly address: string | null;
    readonly cancellationPolicy: string | null;
    readonly closingTime: string | null;
    readonly openingTime: string | null;
    readonly services: string[];
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
    readonly stripe: FirebaseStripe;
}

export interface FirebaseClubDoc extends FirebaseDoc {
    club: Club;
}

export interface FirebaseCoach extends FirebaseClubDoc {
    readonly membershipType: string;
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
}

export interface FirebaseAthlete extends FirebaseClubDoc {
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

export interface ProfileSession {
    readonly price: number;
    readonly guestPrice: number | null;
    readonly feeProcessingOption: FeeProcessingOption;
    readonly type: string;
    readonly coach: Option | null;
    readonly date: Timestamp;
    readonly start: string;
    readonly end: string;
    readonly boat: Option | null;
}

export interface FirebaseSession extends ProfileSession {
    readonly id: string;
}

interface ProfileImage {
    readonly id: string;
    readonly profileImage: string | null;
    readonly profileImageRef: string | null;
}

export type FirebaseClubWithImage = FirebaseClub & ProfileImage;
export type FirebaseCoachWithImage = FirebaseCoach & ProfileImage;
export type FirebaseAthleteWithImage = FirebaseAthlete & ProfileImage;

export type ResponseData =
    | FirebaseClubWithImage
    | FirebaseCoachWithImage
    | FirebaseAthleteWithImage;

export type GetDocDataResponse<T extends ResponseData> = T;
