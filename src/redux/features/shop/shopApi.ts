import { Shop, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleShop: builder.query({
            query: (id) => {
                return {
                    url: `/shop/${id.id}`,
                };
            },
        }),

        getAllShops: builder.query({
            query: () => {
                return {
                    url: `/shop`,
                };
            },
            transformResponse: (response: TResponseRedux<Shop[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["shops"],
        }),
        updateShop: builder.mutation({
            query: (data) => {
                return {
                    url: `/shop/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["shops"],
        }),
        deleteShop: builder.mutation({
            query: (id) => {
                return {
                    url: `/user/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["shops"],
        }),
    }),
});

export const {
    useGetAllShopsQuery,
    useGetSingleShopQuery,
    useUpdateShopMutation,
    useDeleteShopMutation,
} = shopApi;
