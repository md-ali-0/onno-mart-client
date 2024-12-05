import { Brand, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const brandsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleBrand: builder.query({
            query: (id) => {
                return {
                    url: `/brand/${id}`,
                };
            },
            providesTags: ["brands"],
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
                    url: `/brand`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Brand[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["brands"],
        }),
        createBrand: builder.mutation({
            query: (data) => {
                return {
                    url: "/brand",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["brands"],
        }),
        updateBrand: builder.mutation({
            query: (data) => {
                return {
                    url: `/brand/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["brands"],
        }),
        deleteBrand: builder.mutation({
            query: (id) => {
                return {
                    url: `/brand/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["brands"],
        }),
    }),
});

export const {
    useGetAllBrandsQuery,
    useGetSingleBrandQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brandsApi;
