import axiosInstance from "./api-services";

export interface Bot {
  id: string;
  access_token: string;
  created_at: string;
  updated_at: string;
}

export const fetchBots = async (): Promise<Bot[]> => {
    try {
        const response = await axiosInstance.get('/bots');
        console.log('Bots list:', response.data);
        return response.data as Bot[];
    } catch (error) {
        console.error('Failed to fetch bots:', error);
        return [];
    }
};