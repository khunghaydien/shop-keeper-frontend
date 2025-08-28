import axiosInstance from "./api-services";

export interface Product {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  updated_at: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axiosInstance.get('/products');
        console.log('Products list:', response.data);
        return response.data as Product[];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};