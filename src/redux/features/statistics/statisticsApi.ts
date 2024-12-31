import { baseApi } from "../../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStatistics: builder.query({
            query: () => {
                return {
                    url: `/statistics`,
                };
            },
            providesTags: ["statistics"],
        }),
    }),
});

export const { useGetDashboardStatisticsQuery } = statisticsApi;
