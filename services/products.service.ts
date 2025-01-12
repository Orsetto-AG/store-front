import api from './api.service';

export const productsService = {
  async getProducts(params?: any) {
    const { data } = await api.get('/products', { params });
    return data;
  },

  async getProduct(id: string) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async createProduct(productData: any) {
    const { data } = await api.post('/products', productData);
    return data;
  },

  async updateProduct(id: string, productData: any) {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  },

  async deleteProduct(id: string) {
    await api.delete(`/products/${id}`);
  },
};