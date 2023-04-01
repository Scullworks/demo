import { FieldValue } from 'firebase/firestore';
import { UserType } from './user';

interface Club {
    readonly id: string;
    readonly name: string;
}

export interface FirebaseDoc {
    readonly uid: string | undefined;
    readonly name: string | null;
    readonly email: string | undefined;
    readonly phoneNumber: number | null;
}

export interface FirebaseClubDoc extends FirebaseDoc {
    club: Club;
}

export interface FirebaseClub extends FirebaseDoc {
    readonly address: string | null;
    readonly cancellationPolicy: string | null;
    readonly closingTime: string | null;
    readonly openingTime: string | null;
    readonly services: string[];
    readonly createdAt: FieldValue;
    readonly updatedAt: FieldValue;
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
