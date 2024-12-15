import { Product, TQueryParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleProduct: builder.query({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                };
            },
            providesTags: ["products"],
        }),
        getAllProducts: builder.query({
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
                    url: `/product`,
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<Product[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["products"],
        }),
        createProduct: builder.mutation({
            query: (data) => {
                return {
                    url: "/product",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["products"],
        }),
        duplicateProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/product/duplicate/${id}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: (data) => {
                return {
                    url: `/product/${data.id}`,
                    method: "PATCH",
                    body: data.formData,
                };
            },
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useDuplicateProductMutation,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi;
