import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { Product, ListingData, Bid, UserProfile } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const session = await getSession();
      if (session?.accessToken) {
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export const apiService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get('/products');
    return data;
  },

  async createListing(listingData: ListingData): Promise<Product> {
    const { data } = await api.post('/listings', listingData);
    return data;
  },

  async placeBid(auctionId: string, amount: number): Promise<Bid> {
    const { data } = await api.post(`/auctions/${auctionId}/bid`, { amount });
    return data;
  },

  async getUserProfile(): Promise<UserProfile> {
    const { data } = await api.get('/users/profile');
    return data;
  },
};

export default api;