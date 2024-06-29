import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const campingApi = createApi({
	reducerPath: 'camping',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5555',
	}),
	tagTypes: ['Camp'],
	endpoints: (builder) => ({}),
});

export const { useGetCampingsQuery } = campingApi;
export { campingApi };
