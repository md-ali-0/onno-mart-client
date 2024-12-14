import { Review, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleReview: builder.query({
            query: (id) => {
                return {
                    url: `/review/${id}`,
                };
            },
            providesTags: ["reviews"],
        }),
        getAllReviews: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        if (item.value !== undefined) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }
                return {
                    url: `/review`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Review[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["reviews"],
        }),
        createReview: builder.mutation({
            query: (data) => {
                return {
                    url: `/review`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["reviews"],
        }),
        updateReview: builder.mutation({
            query: (data) => {
                return {
                    url: `/review/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["reviews"],
        }),
        deleteReview: builder.mutation({
            query: (id) => {
                return {
                    url: `/review/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["reviews"],
        }),
    }),
});

export const {
    useGetAllReviewsQuery,
    useGetSingleReviewQuery,
    useUpdateReviewMutation,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
