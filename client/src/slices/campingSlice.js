import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { campingApi } from '../store/apis/campingApi';

const campingAdapter = createEntityAdapter({
	selectId: (camp) => camp.contentId, // Specify the unique ID field
	// Optionally, provide a sort comparer for ordering
	sortComparer: (a, b) => a.facltNm.localeCompare(b.facltNm),
});

const initialState = campingAdapter.getInitialState();

export const extendedApiSlice = campingApi.injectEndpoints({
	endpoints: (builder) => ({
		getCampings: builder.query({
			query: () => '/camps',
			// to normalize the raw data from the backend server
			transformResponse: (responseData) => {
				try {
					// setAll method  normalizes and sets the data in the adapter’s state.
					return campingAdapter.setAll(initialState, responseData);
				} catch (error) {
					console.error('Error transforming response data:', error);
					return initialState;
				}
			},
			/* 
			By using providesTags in your endpoint configuration, you can manage cache invalidation for specific data slices. 
			When an API request successfully fetches data, Redux 
			Toolkit Query associates it with the specified tags. 
			Later, if you make a mutation that affects the same data 
			(e.g., updating a resource), you can invalidate the cache 
			for that specific slice by providing the corresponding 
			tags. This ensures that the cached data is refreshed when 
			needed. It’s a powerful way to control caching behavior 
			and keep your data up-to-date
			*/
			providesTags: (result, error, arg) => {
				try {
					const tags = [
						{ type: 'Camp', id: 'LIST' },
						...(result.ids
							? result.ids.map((id) => ({
									type: 'Camp',
									id: arg?.contentId ?? id,
							  }))
							: []),
					];
					return tags;
				} catch (error) {
					console.error('Error generating tags:', error);
					return [];
				}
			},
		}),
	}),
});

export const { useGetCampingsQuery } = extendedApiSlice;

// returns the query result object that has been normalized from transform Response
export const selectCampsResult =
	extendedApiSlice.endpoints.getCampings.select();

// extracts the data property from the selectCampsResult
// slectCampsData is a memoized selector
const selectCampsData = createSelector(
	selectCampsResult,
	(campsResult) => campsResult.data
);

// to create selectors like selectAllCamps, selectCampsById, and selectCampsIds
// which are used to select normalized data from the state.;
export const {
	selectAll: selectAllCamps,
	selectById: selectCampsById,
	selectIds: selectCampsIds,
} = campingAdapter.getSelectors(
	(state) => selectCampsData(state) ?? initialState
);
