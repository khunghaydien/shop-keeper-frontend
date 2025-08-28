import axiosInstance from "./api-services";

export interface Page {
  id: string;
  page_name: string;
  page_id: string;
  created_at: string;
  updated_at: string;
}

export const fetchPages = async (): Promise<Page[]> => {
    try {
        const response = await axiosInstance.get('/pages');
        console.log('Pages list:', response.data);
        return response.data as Page[];
    } catch (error) {
        console.error('Failed to fetch pages:', error);
        return [];
    }
};