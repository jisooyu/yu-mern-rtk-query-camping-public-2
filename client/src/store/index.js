import { configureStore } from '@reduxjs/toolkit';
import { campingApi } from './apis/campingApi';

export const store = configureStore({
	reducer: {
		[campingApi.reducerPath]: campingApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(campingApi.middleware);
	},
});

export { useGetCampingsQuery } from '../slices/campingSlice';
