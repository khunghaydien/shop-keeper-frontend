import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchBots, Bot } from '@/services/bot-services';

interface BotsState {
  data: Bot[];
  filteredData: Bot[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: BotsState = {
  data: [],
  filteredData: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

export const fetchBotsAsync = createAsyncThunk<Bot[]>(
  'bots/fetchBots',
  async () => {
    const response = await fetchBots();
    return response;
  }
);

const botsSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter data based on search term
      if (action.payload.trim() === '') {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(bot =>
          bot.access_token.toLowerCase().includes(action.payload.toLowerCase())
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
      .addCase(fetchBotsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBotsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchBotsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch bots';
      });
  },
});

export const { setSearchTerm, clearSearch } = botsSlice.actions;
export default botsSlice.reducer;
