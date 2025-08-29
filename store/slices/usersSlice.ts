import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, createUser, updateUser, deleteUser, User, CreateUserData, UpdateUserData } from '@/services/user-services';

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

export const createUserAsync = createAsyncThunk<User, CreateUserData>(
  'users/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk<User, UpdateUserData>(
  'users/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response;
  }
);

export const deleteUserAsync = createAsyncThunk<string, string>(
  'users/deleteUser',
  async (userId) => {
    await deleteUser(userId);
    return userId;
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
          user.name?.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email?.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.phone?.toLowerCase().includes(action.payload.toLowerCase())
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
      // Fetch users
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
      })
      // Create user
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.filteredData = state.data;
      })
      // Update user
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.data.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
          state.filteredData = state.data;
        }
      })
      // Delete user
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload);
        state.filteredData = state.data;
      });
  },
});

export const { setSearchTerm, clearSearch } = usersSlice.actions;
export default usersSlice.reducer;
