import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchPages, Page } from '@/services/page-services';

interface PagesState {
  data: Page[];
  filteredData: Page[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: PagesState = {
  data: [],
  filteredData: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

export const fetchPagesAsync = createAsyncThunk<Page[]>(
  'pages/fetchPages',
  async () => {
    const response = await fetchPages();
    return response;
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter data based on search term
      if (action.payload.trim() === '') {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(page =>
          page.page_name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
    clearSearch: (state) => {
      state.searchTerm = '';
      state.filteredData = state.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPagesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchPagesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch pages';
      });
  },
});

export const { setSearchTerm, clearSearch } = pagesSlice.actions;
export default pagesSlice.reducer;
