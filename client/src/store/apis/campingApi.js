import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
/*
The createApi automatically caches the results of API requests, which can significantly improve performance by avoiding redundant network 
 calls. The caching behavior is based on the endpoint configuration 
 you provide when defining your API slice. 
*/
const campingApi = createApi({
	reducerPath: 'camping',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['Camp'],
	endpoints: (builder) => ({}),
});

export const { useGetCampingsQuery } = campingApi;
export { campingApi };
