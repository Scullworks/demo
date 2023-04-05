import axios from 'axios';
import Stripe from 'stripe';

export const axiosInstance = axios.create({
    baseURL: '/api/stripe'
});

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});
