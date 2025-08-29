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

export interface CreateUserData {
  name: string;
  phone: string;
  email: string;
  caprover_instance?: string;
  n8n_instance?: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
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

export const createUser = async (userData: CreateUserData): Promise<User> => {
    try {
        const response = await axiosInstance.post('/users', userData);
        console.log('User created:', response.data);
        return response.data as User;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
};

export const updateUser = async (userData: UpdateUserData): Promise<User> => {
    try {
        const { id, ...updateData } = userData;
        const response = await axiosInstance.put(`/users/${id}`, updateData);
        console.log('User updated:', response.data);
        return response.data as User;
    } catch (error) {
        console.error('Failed to update user:', error);
        throw error;
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/users/${userId}`);
        console.log('User deleted:', userId);
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
    }
};

export const fetchUserById = async (userId: string): Promise<User> => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);
        console.log('User details:', response.data);
        return response.data as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};