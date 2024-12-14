import { Brand, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleBrand: builder.query({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                };
            },
            providesTags: ["orders"],
        }),
        getAllBrands: builder.query({
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
                    url: `/order`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Brand[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["orders"],
        }),
        createBrand: builder.mutation({
            query: (data) => {
                return {
                    url: "/order",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["orders"],
        }),
        updateBrand: builder.mutation({
            query: (data) => {
                return {
                    url: `/order/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["orders"],
        }),
        deleteBrand: builder.mutation({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["orders"],
        }),
    }),
});

export const {
    useGetAllBrandsQuery,
    useGetSingleBrandQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = ordersApi;
