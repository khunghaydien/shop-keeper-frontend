# Redux Store Structure

## Overview
This Redux store is organized with separate slices for different entities to maintain clean separation of concerns and avoid data mixing.

## Store Structure

### Main Store (`store/index.ts`)
- Configures the Redux store with all slices
- Exports `store`, `RootState`, and `AppDispatch` types

### Slices
Each slice manages its own state independently:

#### 1. Users Slice (`store/slices/usersSlice.ts`)
- **State**: `data`, `filteredData`, `searchTerm`, `isLoading`, `error`
- **Actions**: `setSearchTerm`, `clearSearch`
- **Async Actions**: `fetchUsersAsync`
- **Search**: Filters by email

#### 2. Products Slice (`store/slices/productsSlice.ts`)
- **State**: `data`, `filteredData`, `searchTerm`, `isLoading`, `error`
- **Actions**: `setSearchTerm`, `clearSearch`
- **Async Actions**: `fetchProductsAsync`
- **Search**: Filters by product name

#### 3. Bots Slice (`store/slices/botsSlice.ts`)
- **State**: `data`, `filteredData`, `searchTerm`, `isLoading`, `error`
- **Actions**: `setSearchTerm`, `clearSearch`
- **Async Actions**: `fetchBotsAsync`
- **Search**: Filters by access token

#### 4. Pages Slice (`store/slices/pagesSlice.ts`)
- **State**: `data`, `filteredData`, `searchTerm`, `isLoading`, `error`
- **Actions**: `setSearchTerm`, `clearSearch`
- **Async Actions**: `fetchPagesAsync`
- **Search**: Filters by page name

### Typed Hooks (`store/hooks.ts`)
- `useAppDispatch`: Typed dispatch hook
- `useAppSelector`: Typed selector hook

## Usage Example

```tsx
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsersAsync, setSearchTerm } from '@/store/slices/usersSlice';

function UsersPage() {
  const dispatch = useAppDispatch();
  const { filteredData: users, isLoading, error, searchTerm } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  // ... rest of component
}
```

## Search Functionality
Each slice includes:
- **Real-time search**: Updates filtered data as user types
- **Case-insensitive**: Search is not case-sensitive
- **Field-specific**: Each entity searches by its relevant field
- **Instant filtering**: No API calls needed for search

## Benefits of This Structure
1. **Separation of Concerns**: Each slice manages only its own data
2. **No Data Mixing**: Users, products, bots, and pages are completely separate
3. **Reusable Components**: SearchInput component works with any slice
4. **Type Safety**: Full TypeScript support with typed hooks
5. **Performance**: Local filtering without unnecessary API calls
6. **Scalability**: Easy to add new slices or modify existing ones
