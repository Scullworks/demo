const isProduction = process.env.NODE_ENV === 'production';

export const API_KEY = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_API_KEY;

export const AUTH_DOMAIN = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN;

export const PROJECT_ID = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_PROJECT_ID;

export const STORAGE_BUCKET = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_STORAGE_BUCKET;

export const MESSAGING_SENDER_ID = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_MESSAGING_SENDER_ID;

export const APP_ID = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_APP_ID;

export const MEASUREMENT_ID = isProduction
    ? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    : process.env.NEXT_PUBLIC_FIREBASE_DEV_MEASUREMENT_ID;
