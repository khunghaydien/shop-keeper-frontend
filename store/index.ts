import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import productsReducer from './slices/productsSlice';
import botsReducer from './slices/botsSlice';
import pagesReducer from './slices/pagesSlice';

// Export types from services
export type { User } from '@/services/user-services';
export type { Product } from '@/services/product-services';
export type { Bot } from '@/services/bot-services';
export type { Page } from '@/services/page-services';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    bots: botsReducer,
    pages: pagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
