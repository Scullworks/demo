import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Stripe from 'stripe';

export const axiosInstance = axios.create({
    baseURL: '/api/stripe'
});

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
