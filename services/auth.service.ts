import api from './api.service';

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  async register(userData: RegisterData): Promise<LoginResponse> {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getProfile(): Promise<LoginResponse['user']> {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};