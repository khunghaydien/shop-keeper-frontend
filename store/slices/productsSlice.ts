import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, Product } from '@/services/product-services';

interface ProductsState {
  data: Product[];
  filteredData: Product[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  filteredData: [],
  searchTerm: '',
  isLoading: false,
  error: null,
};

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // Filter data based on search term
      if (action.payload.trim() === '') {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(product =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
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
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSearchTerm, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
