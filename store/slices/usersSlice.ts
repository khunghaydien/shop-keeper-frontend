import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, User } from '@/services/user-services';

interface UsersState {
  data: User[];
  filteredData: User[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: [],
  filteredData: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

export const fetchUsersAsync = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter data based on search term (search by name, email, or phone)
      if (action.payload.trim() === '') {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(user =>
          user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.phone.toLowerCase().includes(action.payload.toLowerCase())
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
      .addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setSearchTerm, clearSearch } = usersSlice.actions;
export default usersSlice.reducer;
