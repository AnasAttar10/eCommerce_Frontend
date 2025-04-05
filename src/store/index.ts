import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categoriesApi } from './Category/categoriesApi';
import { productsApi } from './Product/productsApi';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartApi } from './cart/cartApi';
import { wishlistApi } from './wishlist/wishlistApi';
import { authApi } from './auth/authApi';
import authSlice from './auth/authSlice';
import { orderApi } from './order/orderApi';
import { userApi } from './user/userApi';
import { addressApi } from './address/addressApi';
import { brandsApi } from './Brand/brandsApi';
import { couponApi } from './coupon/couponApi';
import { subCategoriesApi } from './SubCategories/subCategoriesApi';
import { reviewsApi } from './review/reviewsApi';

const rootConfigReducer = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};
const authConfigReducer = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authConfigReducer, authSlice),
  [userApi.reducerPath]: userApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,
  [brandsApi.reducerPath]: brandsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  [reviewsApi.reducerPath]: reviewsApi.reducer,
});
const persistedReducer = persistReducer(rootConfigReducer, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      categoriesApi.middleware,
      subCategoriesApi.middleware,
      productsApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      authApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      addressApi.middleware,
      brandsApi.middleware,
      couponApi.middleware,
      reviewsApi.middleware
    ),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
