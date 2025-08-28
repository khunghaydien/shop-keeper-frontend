import axiosInstance from "./api-services";

export interface User {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  caprover_instance?: string;
  n8n_instance?: string;
  role?: string;
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/users');
        console.log('User list:', response.data);
        return response.data as User[];
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
};